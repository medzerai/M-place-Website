import React, { Component } from "react";
import Slider from "react-slick";
import "./../../css/product.css";

export default class ImagesProduct extends Component {
  render() {
    const settings = {
      customPaging: function (i) {
        return (
          <>
            <img
              alt=""
              className="smallPic"
              src={"https://picsum.photos/id/" + i + "/500/500"}
            />
          </>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img alt="" src="https://picsum.photos/id/244/500/500" />
          </div>
          <div>
            <img alt="" src="https://picsum.photos/id/247/500/500" />
          </div>
          <div>
            <img alt="" src="https://picsum.photos/id/248/500/500" />
          </div>
          <div>
            <img alt="" src="https://picsum.photos/id/225/500/500" />
          </div>
        </Slider>
      </div>
    );
  }
}
