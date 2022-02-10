import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../css/carousel.css";
import { Link } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

/*
function showStars(stars) {
  const nbr = Math.trunc(stars);
  var rows;
  for (var i = 0; i < nbr; i++) {
    rows.push(
      <li className="list-inline-item">
        <BsStarFill />
      </li>
    );
  }
  if (stars !== nbr) {
    rows.push(
      <li className="list-inline-item">
        <BsStarHalf />
      </li>
    );
    for (i = 0; i < 4 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  } else {
    for (i = 0; i < 5 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  }
  return rows;
}
*/
export default class Responsive extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <div>
        <h2 className="title">
          Featured <b>Products</b>
          {console.log(this.props.data)}
        </h2>
        <Slider {...settings}>
          {this.props.data.map((item, key) => {
            return (
              <div className="itemCarousel" key={key}>
                <div className="thumb-wrapper">
                  <div className="img-box">
                    <img
                      src={item.picture}
                      className="img-fluid"
                      alt="Play Station"
                      draggable="false"
                    />
                  </div>
                  <div className="thumb-content">
                    <h4>{item.name}</h4>
                    <p className="item-price">
                      <strike>{item.lastPrise} TND</strike>{" "}
                      <b>{item.newPrise} TND</b>
                    </p>
                    <div className="star-rating">
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <BsStarFill />
                        </li>
                        <li className="list-inline-item">
                          <BsStarFill />
                        </li>
                        <li className="list-inline-item">
                          <BsStarFill />
                        </li>
                        <li className="list-inline-item">
                          <BsStarFill />
                        </li>
                        <li className="list-inline-item">
                          <BsStar />
                        </li>
                      </ul>
                    </div>
                    <Link
                      className="btn btn-orange btn-sm"
                      to={item.link}
                      data-abc="true"
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
