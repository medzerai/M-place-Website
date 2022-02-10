import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/presentation.css";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Responsive from "./carousel.js";

var categDisplay =
  '[{"id":1,"title":"Categ 1","min price":120,"pictures":["https://picsum.photos/id/249/500/500","https://picsum.photos/id/299/500/500","https://picsum.photos/id/322/500/500"]},{"id":2,"title":"Categ 2","min price":120,"pictures":["https://picsum.photos/id/252/500/500","https://picsum.photos/id/382/500/500","https://picsum.photos/id/256/500/500"]},{"id":3,"title":"Categ 3","min price":1000,"pictures":["https://picsum.photos/id/282/500/500","https://picsum.photos/id/218/500/500","https://picsum.photos/id/221/500/500"]},{"id":4,"title":"Categ 4","min price":80,"pictures":["https://picsum.photos/id/272/500/500","https://picsum.photos/id/252/500/500","https://picsum.photos/id/292/500/500"]}]';
var tendProduct = JSON.parse(
  '[{"id": 1254,"name": "Iphone 13","stars": 3,"lastPrise": 4300.0,"newPrise": 3980.0, "picture":"https://picsum.photos/id/365/500/500","link":"/electronique/smartphone/smartphone/Iphone"},{"id": 1254,"name": "Iphone 13","stars": 3,"lastPrise": 4300.0,"newPrise": 3980.0, "picture":"https://picsum.photos/id/365/500/500","link":"/electronique/smartphone/smartphone/Iphone"},{"id": 1254,"name": "Iphone 13","stars": 3,"lastPrise": 4300.0,"newPrise": 3980.0, "picture":"https://picsum.photos/id/365/500/500","link":"/electronique/smartphone/smartphone/Iphone"},{"id": 1254,"name": "Iphone 13","stars": 3,"lastPrise": 4300.0,"newPrise": 3980.0, "picture":"https://picsum.photos/id/365/500/500","link":"/electronique/smartphone/smartphone/Iphone"},{"id": 1254,"name": "Iphone 13","stars": 3,"lastPrise": 4300.0,"newPrise": 3980.0, "picture":"https://picsum.photos/id/365/500/500","link":"/electronique/smartphone/smartphone/Iphone"},{"id": 1254,"name": "Iphone 13","stars": 3,"lastPrise": 4300.0,"newPrise": 3980.0, "picture":"https://picsum.photos/id/365/500/500","link":"/electronique/smartphone/smartphone/Iphone"},{"id": 1254,"name": "Iphone 13","stars": 3,"lastPrise": 4300.0,"newPrise": 3980.0, "picture":"https://picsum.photos/id/365/500/500","link":"/electronique/smartphone/smartphone/Iphone"},{"id": 1254,"name": "Iphone 13","stars": 3,"lastPrise": 4300.0,"newPrise": 3980.0, "picture":"https://picsum.photos/id/365/500/500","link":"/electronique/smartphone/smartphone/Iphone"}]'
);
categDisplay = JSON.parse(categDisplay);

var trendCateg = "";
const Presentation = () => {
  return (
    <div className="container-fluid presentation">
      <Carousel fade={true} controls={false} indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50vh"
            src="https://picsum.photos/id/222/2000/500"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50vh"
            src="https://picsum.photos/id/237/2000/500"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50vh"
            src="https://picsum.photos/id/287/2000/500"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className="container mt-50">
        <div className="row">
          {categDisplay.map((item, key) => {
            return (
              <div className="col-md-3 col-sm-6" key={item.id}>
                <div className="card mb-30">
                  <Link
                    className="card-img-tiles"
                    to={"/" + item.title.replaceAll(" ", "_")}
                    data-abc="true"
                  >
                    <div className="inner">
                      <div className="main-img">
                        <img src={item["pictures"][0]} alt="Category" />
                      </div>
                      <div className="thumblist">
                        <img src={item["pictures"][1]} alt="Category" />
                        <img src={item["pictures"][2]} alt="Category" />
                      </div>
                    </div>
                  </Link>
                  <div className="card-body text-center">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="text-muted">
                      Starting from {item["min price"]} TND
                    </p>
                    <Link
                      className="btn btn-orange btn-sm"
                      to={"/" + item.title.replaceAll(" ", "_")}
                      data-abc="true"
                    >
                      View Products
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container">
        <Responsive data={tendProduct} />
      </div>
      <div className="brands">
        <a href="#">
          <img src="//logo.clearbit.com/google.com?greyscale=true" />
          <img src="//logo.clearbit.com/shopify.com?greyscale=true" />
          <img src="//logo.clearbit.com/ethereum.org?greyscale=true" />
          <img src="//logo.clearbit.com/tunisair.com?greyscale=true" />
          <img src="//logo.clearbit.com/topnet.tn?greyscale=true" />
        </a>
      </div>
    </div>
  );
};

export default Presentation;
