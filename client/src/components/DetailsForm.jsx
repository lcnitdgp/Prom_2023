import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BranchData } from "./constants/BranchData";
import { clubs, startRollNumber, studentYear } from "./constants";
import axios from "axios";
import {
  Row,
  Col,
  Spinner,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "./DetailsForm.css";
import { Form as BootstrapForm } from "react-bootstrap";
import { Form, Field, FieldArray, Formik } from "formik";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const requiredErrorMessage = "This field is required";
const emailErrorMessage = "This email id is invalid";
const phoneErrorMessage = "This phone number is invalid";
const phoneLengthErrorMessage = "This phone number can only be 10 characters";
const quoteErrorMessage = "Quote can only be 80 characters long";
const duplicateErrorMessage = "Duplicate club entries found !";
const requestTimeOutErrorMessage =
  "Request Timed out! Please check your internet connection or please contact us if the issue persists.";
const imageSizeErrorMessage = "Image size cannot be greater than 5MB";

yup.addMethod(yup.array, "distinctEntries", function (errorMessage) {
  return this.test(`test-distinct-entries`, errorMessage, function (value) {
    const { path, createError } = this;

    return (
      [...new Set(value)].length === value.length ||
      createError({ path, message: errorMessage })
    );
  });
});

yup.addMethod(yup.string, "maxImageSize", function (errorMessage) {
  return this.test(`test-max-image-size`, errorMessage, function (value) {
    const { path, createError } = this;

    let finalLength = value ? value.length : 0;

    console.log(finalLength / (1024 * 1024));

    return (
      finalLength <= 7 * 1024 * 1024 ||
      createError({ path, message: errorMessage })
    );
  });
});

const validationSchema = yup.object().shape({
  name: yup.string().required(requiredErrorMessage),
  department: yup.string().required(requiredErrorMessage),
  rollNumber: yup.string().required(requiredErrorMessage),
  email: yup.string().required(requiredErrorMessage).email(emailErrorMessage),
  phone: yup
    .string()
    .required(requiredErrorMessage)
    .matches(phoneRegExp, phoneErrorMessage)
    .min(10, phoneLengthErrorMessage)
    .max(10, phoneLengthErrorMessage),
  image: yup
    .string()
    .required(requiredErrorMessage)
    .maxImageSize(imageSizeErrorMessage),
  clubs: yup.array().distinctEntries(duplicateErrorMessage),
  quote: yup.string().max(80, quoteErrorMessage),
  wing: yup.string(),
});

export default function DetailsForm() {
  const { department } = useParams();
  const getRollNumbers = () => {
    var rollNumbers = [];

    for (var i = startRollNumber; i <= BranchData[department].end; i++) {
      rollNumbers.push(`${studentYear}${department}${i}`);
    }
    rollNumbers.concat(BranchData[department].additionalRollNumbers);

    return rollNumbers;
  };

  const rollNumbers = getRollNumbers();
  const navigate = useNavigate();

  const [uploadingImage, setUploadingImage] = useState(false);
  const [show, setShow] = useState(0);
  const [error, setError] = useState(null);

  const toggleShow = () => setShow(!show);

  const initialValues = {
    name: "",
    department,
    rollNumber: rollNumbers[0],
    email: "",
    phone: "",
    image: "",
    clubs: [],
    quote: "",
    wing: "",
  };

  const renderRollNumbers = () => {
    return rollNumbers.map((rollNumber) => {
      return (
        <option
          key={rollNumber}
          value={`${rollNumber}`}
        >{`${rollNumber}`}</option>
      );
    });
  };

  const renderClubOptions = () => {
    return clubs.map((club) => {
      return <option key={club} value={`${club}`}>{`${club}`}</option>;
    });
  };

  const handleFileUpload = (e, values, setValues) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      // console.log(reader.result);
      // field.onChange(e);

      setValues({
        ...values,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("folder", process.env.REACT_APP_CLOUDINARY_UPLOAD_FOLDER);

    try {
      const response = await axios.post(process.env.REACT_APP_CLOUD_URL, data);

      console.log(response);

      if (!response.data.url)
        throw "Sorry, could not upload image.Please try again later.";

      return response.data.url;
    } catch (error) {
      console.log(error);

      if (error.code === "ERR_NETWORK") {
        throw requestTimeOutErrorMessage;
      }

      throw error.stringify();
    }
  };

  const renderErrorToast = () => {
    return (
      <>
        {/* <Button onClick={toggleShow} className="mb-2">
          Toggle Toast <strong>with</strong> Animation
        </Button> */}
        <Toast show={show} onClose={toggleShow} className="error-toast-main">
          <Toast.Header className="error-toast-header">
            <strong className="ms-auto text-center error-toast-header-text">
              Error
            </strong>
          </Toast.Header>
          <Toast.Body className="error-toast text-center">{error}</Toast.Body>
        </Toast>
      </>
    );
  };

  const checkIfAlreadyExists = async (rollNumber) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/check/${rollNumber}`
      );

      console.log("Check if exists:", response);

      if (response.data.error) throw response.data.error;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        throw requestTimeOutErrorMessage;
      }

      throw error;
    }
  };

  const handleSubmit = async (values, setSubmitting) => {
    try {
      await checkIfAlreadyExists(values.rollNumber);

      setUploadingImage(1);
      const imageUrl = await uploadImage(values.image);
      setUploadingImage(0);

      console.log(values, imageUrl);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/submit`,
        { ...values, image: imageUrl }
      );

      if (response.data.success) {
        navigate("/submit");
      }

      throw response.data.error;
    } catch (error) {
      const errorMessage = error.toString();

      console.log(errorMessage);
      setShow(1);
      setError(errorMessage);
    }
    setSubmitting(false);
  };

  return (
    <div className="DetailsForm">
      <div style={{ color: "#808080", fontSize: "13px", marginTop: "5px" }}>
        <center>
          For more information, contact Aditya Mitra (
          <a href="tel:9038055767">9038055767</a>) or M (
          <a href="tel:9830372570">9830372570</a>).
        </center>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
        validationSchema={validationSchema}
      >
        {({ values, setValues, errors, touched, isSubmitting }) => (
          <Form className="contact100-form">
            <Field name="name">
              {({ field, form: { touched, errors }, meta }) => (
                <div class="input-wrapper">
                  <div className="wrap-input100">
                    <span className="label-input100">
                      <span>
                        Full Name:
                        <h5 style={{ color: "red" }}>*</h5>
                      </span>
                    </span>
                    <input className="input100" type="text" {...field} />
                    <span className="error focus-input100"></span>
                  </div>
                  {errors.name && touched.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>
              )}
            </Field>

            <Field name="department">
              {({ field, form: { touched, errors }, meta }) => (
                <div class="input-wrapper">
                  <div className="wrap-input100">
                    <span className="label-input100">
                      <span>
                        Department:
                        <h5 style={{ color: "red" }}>*</h5>
                      </span>
                    </span>
                    <input
                      className="input100"
                      type="text"
                      {...field}
                      readOnly
                    />
                    <span className="focus-input100"></span>
                  </div>
                  {errors.department && touched.department && (
                    <div className="error-message">{errors.department}</div>
                  )}
                </div>
              )}
            </Field>

            <Field name="rollNumber">
              {({ field, form: { touched, errors }, meta }) => (
                <div class="input-wrapper">
                  <div className="wrap-input100">
                    <span className="label-input100">
                      Roll No.
                      <h5 style={{ color: "red" }}>*</h5>
                    </span>

                    <select className="input100" name="rollNumber" {...field}>
                      {renderRollNumbers()}
                    </select>
                    <span className="focus-input100"></span>
                  </div>
                  {errors.rollNumber && touched.rollNumber && (
                    <div className="error-message">{errors.rollNumber}</div>
                  )}
                </div>
              )}
            </Field>

            <Field name="email">
              {({ field, form: { touched, errors }, meta }) => (
                <div class="input-wrapper">
                  <div className="wrap-input100">
                    <span className="label-input100">
                      <span>
                        Email:
                        <h5 style={{ color: "red" }}>*</h5>
                      </span>
                    </span>
                    <input className="input100" type="text" {...field} />
                    <span className="focus-input100"></span>
                  </div>
                  {errors.email && touched.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>
              )}
            </Field>

            <Field name="phone">
              {({ field, form: { touched, errors }, meta }) => (
                <div class="input-wrapper">
                  <div className="wrap-input100">
                    <span className="label-input100">
                      <span>
                        Phone:
                        <h5 style={{ color: "red" }}>*</h5>
                      </span>
                    </span>
                    <input className="input100" type="text" {...field} />
                    <span className="focus-input100"></span>
                  </div>

                  {errors.phone && touched.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>
              )}
            </Field>

            <Field name="image">
              {({ field, form: { touched, errors }, meta }) => {
                console.log(errors.image, touched);

                return (
                  <div class="input-wrapper">
                    <div className="wrap-input100 validate-input photo-wrapper">
                      <span className="label-input100">
                        Photo
                        <h5 style={{ color: "red" }}>*</h5>
                      </span>

                      <BootstrapForm.Control
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileUpload(e, values, setValues);
                        }}
                      />

                      {values.image ? (
                        <img id="photo-display" src={values.image} />
                      ) : null}

                      <span className="focus-input100"></span>
                    </div>

                    {errors.image && touched.image && (
                      <div className="error-message">{errors.image}</div>
                    )}
                  </div>
                );
              }}
            </Field>

            <FieldArray name="clubs">
              {(arrayHelpers) => (
                <div class="input-wrapper">
                  <div className="wrap-input100">
                    <span className="label-input100">Clubs:</span>

                    <div class="d-grid gap-2">
                      <button
                        className="btn btn-success add-button"
                        type="button"
                        onClick={() => arrayHelpers.push(clubs[0])}
                      >
                        Add Club(s)
                      </button>
                    </div>

                    {values.clubs && values.clubs.length > 0
                      ? values.clubs.map((friend, index) => (
                          <div key={index}>
                            <Row>
                              <Col xs={10}>
                                <Field
                                  className="input-wrapper"
                                  name={`clubs.${index}`}
                                >
                                  {({
                                    field,
                                    form: { touched, errors },
                                    meta,
                                  }) => (
                                    <div className="wrap-input100 club-options-render">
                                      <select
                                        className="input100"
                                        {...field}
                                        size="sm"
                                      >
                                        {renderClubOptions()}
                                      </select>
                                      <span className="focus-input100"></span>
                                    </div>
                                  )}
                                </Field>
                              </Col>
                              <Col>
                                <button
                                  type="button"
                                  class="btn-close"
                                  aria-label="Close"
                                  onClick={() => arrayHelpers.remove(index)}
                                ></button>
                              </Col>
                            </Row>

                            <span className="focus-input100"></span>
                          </div>
                        ))
                      : null}
                  </div>

                  {errors.clubs && (
                    <div className="error-message">{errors.clubs}</div>
                  )}
                </div>
              )}
            </FieldArray>

            <Field name="wing">
              {({ field, form: { touched, errors }, meta }) => (
                <div class="input-wrapper">
                  <div className="wrap-input100">
                    <span className="label-input100">
                      <span>Wing:</span>
                    </span>
                    <input className="input100" type="text" {...field} />
                    <span className="focus-input100"></span>
                  </div>
                  {errors.wing && touched.wing && (
                    <div className="error-message">{errors.wing}</div>
                  )}
                </div>
              )}
            </Field>

            <Field name="quote">
              {({ field, form: { touched, errors }, meta }) => (
                <div class="input-wrapper">
                  <div className="wrap-input100">
                    <span className="label-input100">
                      <span>Quote:</span>
                    </span>
                    <input className="input100" type="text" {...field} />
                    <span className="focus-input100"></span>
                  </div>
                  {errors.quote && touched.quote && (
                    <div className="error-message">{errors.quote}</div>
                  )}
                </div>
              )}
            </Field>

            <div className="container-contact100-form-btn d-grid gap-2">
              {show ? renderErrorToast() : null}

              <button
                className="btn-block contact100-form-btn"
                disabled={isSubmitting}
                type="submit"
              >
                <span class="submit-wrapper">
                  {isSubmitting ? (
                    <>
                      {uploadingImage ? "Uploading Image..." : "Loading..."}
                      <span className="loading"></span>
                      <Spinner animation="border" variant="light" />
                    </>
                  ) : (
                    <>
                      Submit
                      <i
                        className="fa fa-long-arrow-right m-l-7"
                        aria-hidden="true"
                      ></i>
                    </>
                  )}
                </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div id="dropDownSelect1"></div>
    </div>
  );
}
