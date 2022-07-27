import * as React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import "../Slick/Slick.css";
import USC from "/Users/cfenderson/Desktop/CPLabs/site-capstone/healthhero/frontend/src/img/LicenseHeader229UofSouthernCal_2SportStyleUSC_132524476454863670.webp";
import Howard from "/Users/cfenderson/Desktop/CPLabs/site-capstone/healthhero/frontend/src/img/howard.jpeg";
import WashU from "/Users/cfenderson/Desktop/CPLabs/site-capstone/healthhero/frontend/src/img/washu.png";
import VT from "/Users/cfenderson/Desktop/CPLabs/site-capstone/healthhero/frontend/src/img/vt.png";
import USF from "/Users/cfenderson/Desktop/CPLabs/site-capstone/healthhero/frontend/src/img/USF.png";
export default function Slick() {
  <script
    src="https://kit.fontawesome.com/cf9f7f67f7.js"
    crossorigin="anonymous"
  ></script>;
  const [sliderRef, setSliderRef] = useState(null);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="content">
      <div className="controls">
        <button onClick={sliderRef?.slickPrev} id="liBrB">
          <i class="fa-solid fa-chevron-right"></i>
          {/* doesnt work */}
          {"<"}
        </button>
        <button onClick={sliderRef?.slickNext} id="liBrB">
          <i class="fa-solid fa-chevron-right"></i>
          {">"}
        </button>
      </div>
      <div>
        <Slider ref={setSliderRef} {...settings}>
          <div id="schoolHome">
            <img src={USC} alt="USC" />
          </div>
          <div id="schoolHome">
            <img src={Howard} alt="Howard" />
          </div>
          <div id="schoolHome">
            <img src={WashU} alt="WashU" />
          </div>
          <div id="schoolHome">
            <img src={VT} alt="VT" />
          </div>
          <div id="schoolHome">
            <img src={USF} alt="USF" />
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}

// for more info: https://blog.logrocket.com/create-carousel-react-slick/
