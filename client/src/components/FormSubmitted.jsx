import React from 'react';
import "./DetailsForm.css"
function FormSubmitted() {
  return (
    <div className="container">
      <div className="DetailsForm">
      <div className="jumbotron" style={{ marginTop: "50px",color: "Brown" }}>
        <center>
         <h4>Thanks for your submission.
          <br />
          For any help or queries, contact Aditya Mitra (
          <a href="tel:9331055168" style={{color: "Brown" }}>9331055168</a>) or Sebontika Bose (
          <a href="tel:7044070449" style={{color: "Brown" }}>7044070449</a>).</h4> 
          <p style={{ margin: "30px 0" }}>
            <a href="/" style={{ fontSize: "25px", color: "Brown" }}>
              Add another submission.
            </a>
          </p>
        </center>
      </div>
      </div>
    </div>
  );
}

export default FormSubmitted;