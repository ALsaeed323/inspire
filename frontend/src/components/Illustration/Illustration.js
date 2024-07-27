// components/Illustration.js
import React from "react";
import "./Illustration.css";

function Illustration() {
  return (
    <div style={{maxHeight:'710px'}}  className="illustration">
<p class="large-text">Lorem ipsum dolor sit amet, consectetur</p>
<p class="small-text">Lorem ipsum dolor sit amet, consectetur</p>

      <div class="loading-indicator">
        <div class="dot active"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/img-a2-grid.72f620d8 1.png`}
        alt="Illustration" 
      />
    </div>
  );
}

export default Illustration;
