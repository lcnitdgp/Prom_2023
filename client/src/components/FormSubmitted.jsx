import React from 'react';
import "./DetailsForm.css"
import "./FormSubmitted.css"
function FormSubmitted() {
  return (
    <div className="container" >
      <div className="DetailsForm" x="50%" y="50%" style={{height: "30%" }}>
      <div className="jumbotron" style={{ marginTop: "50px",color: "Dark Brown" }}>
        <center>
         <h4>Thanks for your submission.
          <br />
          For any help or queries, contact Epshita Chakravarty (
          <a href="tel: 9054093102" style={{color: "Dark Brown" }}>9054093102</a>) or Pushpal Ghodaskar (
          <a href="tel: 8055628645" style={{color: "Dark Brown" }}>8055628645</a>).</h4> 
          <p style={{ margin: "30px 0" }}>
            <a href="/" style={{ fontSize: "25px", color: "Dark Brown" }}>
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