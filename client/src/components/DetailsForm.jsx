import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BranchData } from "./constants/BranchData";
import { clubs, startRollNumber, studentYear } from "./constants";
import axios from "axios";
import { Button, Row, Col } from "react-bootstrap";
import "./DetailsForm.css";

export default function DetailsForm() {
  const { department } = useParams();

  const [formValues, setFormValues] = useState({
    department,
  });

  const renderRollNumbers = () => {
    var rollNumbers = [];

    for (var i = startRollNumber; i <= BranchData[department].end; i++) {
      rollNumbers.push(`${studentYear}${department}${i}`);
    }
    rollNumbers.concat(BranchData[department].additionalRollNumbers);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    console.log(file);

    reader.onloadend = () => {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleClubAddition = (e) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      clubs: prevFormValues.clubs
        ? [...prevFormValues.clubs, clubs[0]]
        : [clubs[0]],
    }));
  };

  const handleClubDeletion = (e, index) => {
    console.log(index);

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      clubs: prevFormValues.clubs.filter(
        (element, innerIndex) => innerIndex !== index
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formValues, `${process.env.REACT_APP_BACKEND_URL}/submit`);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/submit`, formValues);
  };

  const onChangeClubValue = (e, index) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      clubs: prevFormValues.clubs.map((element, innerIndex) => {
        if (innerIndex === index) {
          return e.target.value;
        }
        return element;
      }),
    }));
  };
  const renderClubs = (e) => {
    console.log(formValues.clubs);

    return (
      <div className="d-grid">
        {formValues.clubs
          ? formValues.clubs.map((element, index) => {
              return (
                <Row>
                  <Col xs={10}>
                    <select
                      className="input100 club-options-render"
                      value={element}
                      onChange={(e) => onChangeClubValue(e, index)}
                    >
                      {renderClubOptions()}
                    </select>
                  </Col>
                  <Col>
                    <button
                      type="button"
                      class="btn-close"
                      aria-label="Close"
                      onClick={(e) => handleClubDeletion(e, index)}
                    ></button>
                  </Col>
                </Row>
              );
            })
          : null}
      </div>
    );
  };

  console.log(formValues);

  return (
    <div className="DetailsForm">
      <div style={{ color: "#808080", fontSize: "13px", marginTop: "5px" }}>
        <center>
          For more information, contact Shubham (
          <a href="tel:9038055767">9038055767</a>) or Mohit (
          <a href="tel:9830372570">9830372570</a>).
        </center>
      </div>
      <form
        className="contact100-form validate-form"
        id="student-form"
        onSubmit={handleSubmit}
      >
        <div
          className="wrap-input100 validate-input"
          data-validate="Name is required"
        >
          <span className="label-input100">
            <span>
              Full Name:
              <h5 style={{ color: "red" }}>*</h5>
            </span>
          </span>
          <input
            className="input100"
            type="text"
            name="name"
            id="name"
            placeholder="Enter full name"
            value={formValues.name}
            onChange={handleChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
          <span className="label-input100">Department</span>
          <input
            className="input100"
            type="text"
            name="department"
            id="department"
            value={formValues.department}
            readOnly
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
          <span className="label-input100">
            Roll No.
            <h5 style={{ color: "red" }}>*</h5>
          </span>

          <select
            className="input100"
            name="rollNumber"
            value={formValues.rollNumber}
            onChange={handleChange}
          >
            {renderRollNumbers()}
          </select>
          <span className="focus-input100"></span>
        </div>

        <div
          className="wrap-input100 validate-input"
          data-validate="Valid email is required: ex@abc.xyz"
        >
          <span className="label-input100">
            Email:
            <h5 style={{ color: "red" }}>*</h5>
          </span>
          <input
            className="input100"
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter email addess"
          />
          <span className="focus-input100"></span>
        </div>

        <div
          className="wrap-input100 validate-input"
          data-validate="Phone is required"
        >
          <span className="label-input100">
            Phone:
            <h5 style={{ color: "red" }}>*</h5>
          </span>
          <input
            className="input100"
            type="number"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
          <span className="label-input100">Club(s):</span>

          {renderClubs()}

          <div class="d-grid gap-2">
            <button
              class="btn btn-success add-button"
              type="button"
              onClick={handleClubAddition}
            >
              Add Club(s)(if any)
            </button>
          </div>

          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input photo-wrapper">
          <span className="label-input100">
            Photo
            <h5 style={{ color: "red" }}>*</h5>
          </span>
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            style={{ width: "100%" }}
            onChange={handleFileUpload}
          />

          {formValues.image ? (
            <img id="photo-display" src={formValues.image} />
          ) : null}

          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
          <span className="label-input100">Wing:</span>
          <input
            type="text"
            name="wing"
            id="wing"
            className="input100"
            placeholder="Name of your wing(if any)"
            value={formValues.wing}
            onChange={handleChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
          <span className="label-input100">Quote:</span>
          <input
            className="input100"
            type="text"
            name="quote"
            id="quote"
            placeholder="Enter a Quote (Max 80 characters)"
            maxLength="80"
            value={formValues.quote}
            onChange={handleChange}
          />
          <span className="focus-input100"></span>
        </div>
        <div className="container-contact100-form-btn d-grid gap-2">
          <button
            className="submit-button btn-block btn btn-success btn-lg"
            style={{ backgroundColor: "#57b846" }}
          >
            <span>
              Submit
              <i
                className="fa fa-long-arrow-right m-l-7"
                aria-hidden="true"
              ></i>
            </span>
          </button>
        </div>
      </form>
      <div id="dropDownSelect1"></div>
    </div>
  );
}
