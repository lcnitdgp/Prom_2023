import React from "react";
import { Outlet } from "react-router-dom";

export default function Main() {
  console.log("Main rendered");

  return (
    <>
      <div className="container-contact100">
        <div
          className="contact100-map"
          id="google_map"
          data-map-x="40.722047"
          data-map-y="-73.986422"
          data-pin="images/icons/map-marker.png"
          data-scrollwhell="0"
          data-draggable="1"
        ></div>

        {/* <div className="wrap-contact100">
          <div
            className="contact100-form-title"
            style={{ backgroundImage: "url(/images/bg-01.jpg)" }}
          > 
            <span className="contact100-form-title-1"> Yearbook 2023 </span>

            <span className="contact100-form-title-2"> Literary Circle </span>
          </div>

          <Outlet />
        </div> */}

        <div class="patterns">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="polka-dots"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle fill="#be9ddf" cx="25" cy="25" r="3"></circle>
              </pattern>
              <style>
                @import url("https://fonts.googleapis.com/css?
                family=Lora:400,400i,700,700i");
              </style>
            </defs>

            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#polka-dots)"
            >
              {" "}
            </rect>

            <text x="50%" y="30%" text-anchor="middle">
              Gracias
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}
