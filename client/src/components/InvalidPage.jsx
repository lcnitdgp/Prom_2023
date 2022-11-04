import React from "react";

export default function InvalidPage() {
  return (
    <div class="container">
      <div class="jumbotron" style={{ marginTop: "50px;" }}>
        <center>
          Due to some technical difficulties, the form will start accepting
          responses after a while.
          <br />
          Please contact Shubham (<a href="tel:9038055767">9038055767</a>) or
          Mohit (<a href="tel:9830372570">9830372570</a>) for further queries.
          {/* <p style="margin-top: 20px;"><a href="/" style="font-size: 18px;">Go back.</a></p> */}
        </center>
      </div>
    </div>
  );
}
