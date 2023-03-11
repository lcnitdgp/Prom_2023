import React from "react";
import "./Main_11.css";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Main() {
  console.log("Main rendered");

  const navigate = useNavigate();

  const onSubmitButton = (e) => {
    e.preventDefault();
    setTimeout(() => {
      return navigate("/form");
    }, 2000);
  };

  return (
    <>
      {/* <div className="container-contact100">
        <div
          className="contact100-map"
          id="google_map"
          data-map-x="40.722047"
          data-map-y="-73.986422"
          data-pin="images/icons/map-marker.png"
          data-scrollwhell="0"
          data-draggable="1"
        ></div> */}
{/* 
       <div className="wrap-contact100"> 

       <div
            className="contact100-form-title"
            style={{ backgroundImage: "url(/images/bg-01.jpg)" }}
          > 
            <span className="contact100-form-title-1"> Yearbook 2023 </span>

            <span className="contact100-form-title-2"> Literary Circle </span>
          </div>

          <Outlet /> 
          </div> */}
      <div className="logo-div" >
           <img src="images/verve_logo.png" className="verve_logo" />
           <img src="images/lc_logo.png" className="lc_logo" />
      </div>
      <div class="patterns" >
        <svg width="100%" height="70%">
          
          <text x="50%" y="45%" text-anchor="middle">
            Prom Night
          </text>
          <text x="50%" y="65%" text-anchor="middle" className="Date">
            18th March 2023, 5:30pm at Residency
          </text>
          {/* <text x="50%" y="85%" text-anchor="middle" className="Date">
            <br/>Citi Residency
          </text> */}
        </svg>
        <br/>
        <button className="register_button"style={{position: "absolute",top: "80%"}} onClick={onSubmitButton}>
         REGISTER FOR PROM
          <div class="star-1">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 784.11 815.53"
              style={{shapeRendering:'geometricPrecision', textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd",clipRule:"evenodd"}}
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  class="fil0"
                ></path>
              </g>
            </svg>
          </div>
          <div class="star-2">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 784.11 815.53"
              style={{shapeRendering:'geometricPrecision', textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd",clipRule:"evenodd"}}
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  class="fil0"
                ></path>
              </g>
            </svg>
          </div>
          <div class="star-3">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 784.11 815.53"
              style={{shapeRendering:'geometricPrecision', textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd",clipRule:"evenodd"}}
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  class="fil0"
                ></path>
              </g>
            </svg>
          </div>
          <div class="star-4">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 784.11 815.53"
              style={{shapeRendering:'geometricPrecision', textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd",clipRule:"evenodd"}}
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  class="fil0"
                ></path>
              </g>
            </svg>
          </div>
          <div class="star-5">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 784.11 815.53"
              style={{shapeRendering:'geometricPrecision', textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd",clipRule:"evenodd"}}
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  class="fil0"
                ></path>
              </g>
            </svg>
          </div>
          <div class="star-6">
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 784.11 815.53"
              style={{shapeRendering:'geometricPrecision', textRendering:"geometricPrecision", imageRendering:"optimizeQuality", fillRule:"evenodd",clipRule:"evenodd"}}
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  class="fil0"
                ></path>
              </g>
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}