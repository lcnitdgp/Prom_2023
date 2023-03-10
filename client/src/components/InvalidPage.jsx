import React from 'react';

export default function InvalidPage() {
  return (
    <div class="container">
      <div class="jumbotron" style={{ marginTop: "50px;" }}>
        <center>
          Due to some technical difficulties, the form will start accepting
          responses after a while.
          <br />
          Please contact Aditya Mitra (<a href="tel:9331055168">9331055168</a>)
          or Sebontika Bose (<a href="tel:7044070449">7044070449</a>) for
          further queries.
          {/* <p style="margin-top: 20px;"><a href="/" style="font-size: 18px;">Go back.</a></p> */}
        </center>
      </div>
    </div>
  );
}
