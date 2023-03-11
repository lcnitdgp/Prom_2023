import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { BranchData } from "./constants/BranchData";
// import { clubs, studentYear } from "./constants";
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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emojiRegex = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
const englishChractersRegex = /^[ ~`!@#$%^&*()_+=[\]\{}|;':,.\/<>?a-zA-Z0-9-]+$/;

const requiredErrorMessage = "This field is required";
const emailErrorMessage = "This email id is invalid";
const phoneErrorMessage = "This phone number is invalid";
const phoneLengthErrorMessage = "This phone number can only be 10 characters";
const quoteErrorMessage = "Quote can only be 80 characters long";
const duplicateErrorMessage = "Duplicate club entries found !";
const requestTimeOutErrorMessage =
  "Request Timed out! Please check your internet connection or please contact us if the issue persists.";
const imageSizeErrorMessage = "Image size cannot be greater than 5MB";
const emojiErrorMessage = "This field cannot contain an emoji";
const doubleQuotesErrorMessage = 'This field cannot contain double quotes(" ")';
const englishCharactersErrorMessage =
  "This field can only contain English alphabets(a-z,A-Z),numbers(0-9) and special characters( ~`!@#$%^&*()_+=[]{}|;':,./<>?- )";

yup.addMethod(yup.array, "distinctEntries", function(errorMessage) {
  return this.test(`test-distinct-entries`, errorMessage, function(value) {
    const { path, createError } = this;

    return (
      [...new Set(value)].length === value.length ||
      createError({ path, message: errorMessage })
    );
  });
});

yup.addMethod(yup.string, "maxImageSize", function(errorMessage) {
  return this.test(`test-max-image-size`, errorMessage, function(value) {
    const { path, createError } = this;

    const finalLength = value ? value.length : 0;

    return (
      finalLength <= 7 * 1024 * 1024 ||
      createError({ path, message: errorMessage })
    );
  });
});

yup.addMethod(yup.string, "checkNoEmojis", function(errorMessage) {
  return this.test(`test-emoji-presence`, errorMessage, function(value) {
    const { path, createError } = this;

    return (
      !emojiRegex.test(value) || createError({ path, message: errorMessage })
    );
  });
});

yup.addMethod(yup.string, "checkNoDoubleQuotes", function(errorMessage) {
  return this.test(`test-double-quote-presence`, errorMessage, function(value) {
    const { path, createError } = this;

    console.log(value);

    return (
      (value ? !value.includes(`"`) : 1) ||
      createError({ path, message: errorMessage })
    );
  });
});

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(requiredErrorMessage)
    .checkNoEmojis(emojiErrorMessage)
    .matches(englishChractersRegex, englishCharactersErrorMessage),
  year: yup.string().required(requiredErrorMessage),
  rollNumber: yup.string().required(requiredErrorMessage),
  phone: yup
    .string()
    .required(requiredErrorMessage)
    .matches(phoneRegExp, phoneErrorMessage)
    .min(10, phoneLengthErrorMessage)
    .max(10, phoneLengthErrorMessage),
  name1: yup
    .string()
    .required(requiredErrorMessage)
    .checkNoEmojis(emojiErrorMessage)
    .matches(englishChractersRegex, englishCharactersErrorMessage),
  year1: yup.string().required(requiredErrorMessage),
  rollNumber1: yup.string().required(requiredErrorMessage),
  phone1: yup
    .string()
    .required(requiredErrorMessage)
    .matches(phoneRegExp, phoneErrorMessage)
    .min(10, phoneLengthErrorMessage)
    .max(10, phoneLengthErrorMessage),
  paymentProof: yup
    .string()
    .required()
    .maxImageSize(imageSizeErrorMessage),
  payTo: yup.string().required(requiredErrorMessage),
});

const yearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
];
const paymentOptions = ["Pushpal", "Archit"];

export default function DetailsForm() {
  const { code } = useParams();

  console.log(code);

  const navigate = useNavigate();

  const [uploadingImage, setUploadingImage] = useState(false);
  const [show, setShow] = useState(0);
  const [error, setError] = useState(null);

  const toggleShow = () => setShow(!show);

  const initialValues = {
    name: "",
    rollNumber: "",
    year: yearOptions[0],
    phone: "",
    name1: "",
    rollNumber1: "",
    year1: yearOptions[0],
    phone1: "",
    payTo: paymentOptions[0],
    paymentProof: "",
  };

  const handleFileUpload = (e, values, setValues) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      // console.log(reader.result);
      // field.onChange(e);

      setValues({
        ...values,
        paymentProof: reader.result,
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
      if (values.rollNumber1) await checkIfAlreadyExists(values.rollNumber1);

      let finalValues = {
        payTo: values.payTo,
        students: [
          {
            name: values.name,
            rollNumber: values.rollNumber,
            phone: values.phone,
            year: values.year,
          },
        ],
      };

      if (values.rollNumber1) {
        finalValues.students.push({
          name: values.name1,
          rollNumber: values.rollNumber1,
          phone: values.phone1,
          year: values.year1,
        });
      }

      if (values.paymentProof) {
        setUploadingImage(1);
        const imageUrl = await uploadImage(values.paymentProof);
        setUploadingImage(0);
        console.log(values, imageUrl);
        finalValues = { ...finalValues, paymentProof: imageUrl };
      }

      console.log(finalValues);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/submit`,
        finalValues
      );

      if (response.data.success) {
        navigate("/submit");
        return;
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
    <div className="outside-wrapper">
      <div className="DetailsForm">
        
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
          validationSchema={validationSchema}
        >
          {({ values, setValues, errors, touched, isSubmitting }) => (
            <Form className="contact100-form">
            <div className="Title-text">
             <h2 className="Member" style={{color: "Black", margin: "2px"}}>MEMBER 1</h2>
            </div>
              <Field name="name">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="input-wrapper">
                    <div className="wrap-input100">
                      <span className="label-input100">
                        <span style={{color:"black"}}>
                          Name: <b style={{ color: "red" }}>*</b>
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

              <Field name="year">
                {({ field, form: { touched, errors }, meta }) => {
                  console.log(errors);
                  console.log(values);

                  return (
                    <div class="input-wrapper">
                      <div className="wrap-input100">
                        <span className="label-input100">
                          Year: <b style={{ color: "red" }}>*</b>
                        </span>

                        <select className="input100" {...field}>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                        <span className="focus-input100"></span>
                      </div>
                      {errors.year && touched.year && (
                        <div className="error-message">{errors.year}</div>
                      )}
                    </div>
                  );
                }}
              </Field>

              <Field name="rollNumber">
                {({ field, form: { touched, errors }, meta }) => (
                  <div class="input-wrapper">
                    <div className="wrap-input100">
                      <span className="label-input100">
                        <span>
                          Roll Number: <b style={{ color: "red" }}>*</b>
                        </span>
                      </span>
                      <input className="input100" type="text" {...field} />
                      <span className="error focus-input100"></span>
                    </div>
                    {errors.rollNumber && touched.rollNumber && (
                      <div className="error-message">{errors.rollNumber}</div>
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
                          Phone: <b style={{ color: "red" }}>*</b>
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
              <div className="Title-text">
              <h2  className="Member" style={{color: "Black", margin: "2px"}}>MEMBER 2</h2>
              </div>
              
              <Field name="name1">
                {({ field, form: { touched, errors }, meta }) => (
                  <div className="input-wrapper">
                    <div className="wrap-input100">
                      <span className="label-input100">
                        <span>
                          Name: <b style={{ color: "red" }}>*</b>
                        </span>
                      </span>
                      <input className="input100" type="text" {...field} />
                      <span className="error focus-input100"></span>
                    </div>
                    {errors.name1 && touched.name1 && (
                      <div className="error-message">{errors.name1}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="year1">
                {({ field, form: { touched, errors }, meta }) => {
                  console.log(errors);
                  console.log(values);

                  return (
                    <div class="input-wrapper">
                      <div className="wrap-input100">
                        <span className="label-input100">
                          Year: <b style={{ color: "red" }}>*</b>
                        </span>

                        <select className="input100" {...field}>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                        <span className="focus-input100"></span>
                      </div>
                      {errors.year1 && touched.year1 && (
                        <div className="error-message">{errors.year1}</div>
                      )}
                    </div>
                  );
                }}
              </Field>

              <Field name="rollNumber1">
                {({ field, form: { touched, errors }, meta }) => (
                  <div class="input-wrapper">
                    <div className="wrap-input100">
                      <span className="label-input100">
                        <span>
                          Roll Number: <b style={{ color: "red" }}>*</b>
                        </span>
                      </span>
                      <input className="input100" type="text" {...field} />
                      <span className="error focus-input100"></span>
                    </div>
                    {errors.rollNumber1 && touched.rollNumber1 && (
                      <div className="error-message">{errors.rollNumber1}</div>
                    )}
                  </div>
                )}
              </Field>

              <Field name="phone1">
                {({ field, form: { touched, errors }, meta }) => (
                  <div class="input-wrapper">
                    <div className="wrap-input100">
                      <span className="label-input100">
                        <span>
                          Phone: <b style={{ color: "red" }}>*</b>
                        </span>
                      </span>
                      <input className="input100" type="text" {...field} />
                      <span className="focus-input100"></span>
                    </div>

                    {errors.phone1 && touched.phone1 && (
                      <div className="error-message">{errors.phone1}</div>
                    )}
                  </div>
                )}
              </Field>
             
              <Field name="payTo">
                {({ field, form: { touched, errors }, meta }) => {
                  return (
                    <div class="input-wrapper">
                      <div className="wrap-input100">
                        <span className="label-input100">
                          Payment To (Rs.1300 per couple) : <b style={{ color: "red" }}>*</b> <br/>
                        <div className="images_payment">
                         <figure>
                         <figcaption className="upi1">Pushpal</figcaption>
                           <img src="images/pushpal__qr.jpg" style={{outterFit: "contain", width: "100%",padding: "2px"}}/>
                           
                           <figcaption className="upi1">UPI ID</figcaption>
                            <figcaption className="upi2">pushpalghodaskar-1@okaxis</figcaption>
                          </figure>
                          <figure>
                          <figcaption className="upi1">Archit</figcaption>
                           <img src="images/archit_qr.jpeg" style={{outterFit: "contain", width: "100%",padding: "2px"}}/>
                           
                           <figcaption className="upi1">UPI ID</figcaption>
                            <figcaption className="upi2">9144648481@ibl</figcaption>
                          </figure>
                        </div>
                          
                        </span>

                        <select className="input100" {...field}>
                          <option name="Pushpal">Pushpal
                          </option>
                          
                          <option name="Archit">Archit
                         </option>
                          
                        </select>
                        <span className="focus-input100"></span>
                      </div>
                      {errors.payTo && touched.payTo && (
                        <div className="error-message">{errors.payTo}</div>
                      )}
                    </div>
                  );
                }}
              </Field>

              <Field name="paymentProof">
                {({ field, form: { touched, errors }, meta }) => {
                  return (
                    <div class="input-wrapper">
                      <div className="wrap-input100 validate-input photo-wrapper">
                        <span className="label-input100">
                          Payment Proof: <b style={{ color: "red" }}>*</b>
                        </span>
                        <div
                          style={{
                            border: "1px solid black",
                            top: "10px",
                            borderRadius: "2px",
                          }}
                        >
                          <BootstrapForm.Control
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => {
                              handleFileUpload(e, values, setValues);
                            }}
                            style={{ opacity: "0%" }}
                          />
                          <p
                            className="photo"
                            style={{
                              position: "absolute",
                              width: "100%",
                              zIndex: "-1",
                              alignItems: "center",
                            }}
                          >
                            Choose File
                          </p>
                          {values.paymentProof ? (
                            <img id="photo-display" src={values.paymentProof} />
                          ) : null}

                          <span className="focus-input100"></span>
                        </div>
                      </div>

                      {errors.paymentProof && touched.paymentProof && (
                        <div className="error-message">
                          {errors.paymentProof}
                        </div>
                      )}
                    </div>
                  );
                }}
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
    </div>
  );
}
