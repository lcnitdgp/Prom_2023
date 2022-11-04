import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BranchData } from "./Constants/BranchData";
import { startRollNumber, studentYear } from "./Constants";

export default function DetailsForm() {
  const { department } = useParams();

  const [formValues, setFormValues] = useState({
    image: null,
  });

  const renderRollNumbers = () => {
    var rollNumbers = [];

    for (var i = startRollNumber; i <= BranchData[department].end; i++) {
      rollNumbers.push(`${studentYear}${department}${i}`);
    }
    rollNumbers.concat(BranchData[department].additionalRollNumbers);

    return rollNumbers.map((rollNumber) => {
      return <option value={`${rollNumber}`}>{`${rollNumber}`}</option>;
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

  console.log(formValues);

  return (
    <>
      <div style={{ color: "#808080", fontSize: "13px", marginTop: "5px" }}>
        <center>
          For more information, contact Shubham (
          <a href="tel:9038055767">9038055767</a>) or Mohit (
          <a href="tel:9830372570">9830372570</a>).
        </center>
      </div>
      <form
        className="contact100-form validate-form"
        name="regform"
        id="student-form"
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
            value={department}
            readonly
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
          <span className="label-input100">
            Roll No.
            <h5 style={{ color: "red" }}>*</h5>
          </span>
          <select className="input100" name="roll_no" id="roll_no">
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
            name="email_id"
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
            id="phone"
            placeholder="Enter phone number"
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
          <span className="label-input100">Club(s):</span>
          <input
            className="input100"
            type="text"
            name="clubs"
            id="clubs"
            placeholder="Name(s) of clubs(if any)"
          />
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
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100">
          <span className="label-input100">
            Quote:
            <p className="text-right" id="count">
              80
            </p>
          </span>
          <input
            className="input100"
            type="text"
            name="quote"
            id="quote"
            placeholder="Enter a Quote"
          />
          <span className="focus-input100"></span>
        </div>

        <div className="container-contact100-form-btn">
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
    </>
  );
}
