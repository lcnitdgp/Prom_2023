import React from 'react';
function FormSubmitted() {
  return (
    <div className="container">
      <div className="jumbotron" style={{ marginTop: "50px",color: "white" }}>
        <center>
          Thanks for your submission.
          <br />
          For any help or queries, contact Aditya Mitra (
          <a href="tel:9331055168" style={{color: "white" }}>9331055168</a>) or Sebontika Bose (
          <a href="tel:7044070449" style={{color: "white" }}>7044070449</a>).
          <p style={{ margin: "30px 0" }}>
            <a href="/" style={{ fontSize: "25px", color: "whitesmoke" }}>
              Add another submission.
            </a>
          </p>
        </center>
      </div>
    </div>
  );
}

export default FormSubmitted;
