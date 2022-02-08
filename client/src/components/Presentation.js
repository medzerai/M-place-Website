import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/presentation.css";
import { Carousel } from "react-bootstrap";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

var categDisplay =
  '[{"id":1,"title":"Categ 1","min price":120,"pictures":["https://picsum.photos/id/249/500/500","https://picsum.photos/id/299/500/500","https://picsum.photos/id/322/500/500"]},{"id":2,"title":"Categ 2","min price":120,"pictures":["https://picsum.photos/id/252/500/500","https://picsum.photos/id/382/500/500","https://picsum.photos/id/256/500/500"]},{"id":3,"title":"Categ 3","min price":1000,"pictures":["https://picsum.photos/id/282/500/500","https://picsum.photos/id/218/500/500","https://picsum.photos/id/221/500/500"]},{"id":4,"title":"Categ 4","min price":80,"pictures":["https://picsum.photos/id/272/500/500","https://picsum.photos/id/252/500/500","https://picsum.photos/id/292/500/500"]}]';

categDisplay = JSON.parse(categDisplay);

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
                  <a className="card-img-tiles" href="/" data-abc="true">
                    <div className="inner">
                      <div className="main-img">
                        <img src={item["pictures"][0]} alt="Category" />
                      </div>
                      <div className="thumblist">
                        <img src={item["pictures"][1]} alt="Category" />
                        <img src={item["pictures"][2]} alt="Category" />
                      </div>
                    </div>
                  </a>
                  <div className="card-body text-center">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="text-muted">
                      Starting from {item["min price"]} TND
                    </p>
                    <a
                      className="btn btn-orange btn-sm"
                      href="/"
                      data-abc="true"
                    >
                      View Products
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-xl trend-product">
        <div className="row">
          <div className="col-md-12">
            <h2>
              Featured <b>Products</b>
            </h2>
            <div
              id="myCarousel"
              className="carousel slide"
              data-ride="carousel"
              data-interval="0"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="/myCarousel"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="/myCarousel" data-slide-to="1"></li>
                <li data-target="/myCarousel" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="item carousel-item active">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/ipad.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Apple iPad</h4>
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
                          <p className="item-price">
                            <strike>400.00 TND</strike> <b>369.00 TND</b>
                          </p>
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/headphone.jpg"
                            className="img-fluid"
                            alt="Headphone"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Sony Headphone</h4>
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
                          <p className="item-price">
                            <strike>25.00 TND</strike> <b>23.99 TND</b>
                          </p>
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/macbook-air.jpg"
                            className="img-fluid"
                            alt="Macbook"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Macbook Air</h4>
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
                                <BsStarHalf />
                              </li>
                            </ul>
                          </div>
                          <p className="item-price">
                            <strike>899.00 TND</strike> <b>649.00 TND</b>
                          </p>
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/nikon.jpg"
                            className="img-fluid"
                            alt="Nikon"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Nikon DSLR</h4>
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
                                <BsStar />
                              </li>
                              <li className="list-inline-item">
                                <BsStar />
                              </li>
                            </ul>
                          </div>
                          <p className="item-price">
                            <strike>315.00 TND</strike> <b>250.00 TND</b>
                          </p>
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item carousel-item">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/play-station.jpg"
                            className="img-fluid"
                            alt="Play Station"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Sony Play Station</h4>
                          <p className="item-price">
                            <strike>289.00 TND</strike> <b>269.00 TND</b>
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
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/macbook-pro.jpg"
                            className="img-fluid"
                            alt="Macbook"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Macbook Pro</h4>
                          <p className="item-price">
                            <strike>1099.00 TND</strike> <b>869.00 TND</b>
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
                                <BsStarHalf />
                              </li>
                            </ul>
                          </div>
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/speaker.jpg"
                            className="img-fluid"
                            alt="Speaker"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Bose Speaker</h4>
                          <p className="item-price">
                            <strike>109.00 TND</strike> <b>99.00 TND</b>
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
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/galaxy.jpg"
                            className="img-fluid"
                            alt="Galaxy"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Samsung Galaxy S8</h4>
                          <p className="item-price">
                            <strike>599.00 TND</strike> <b>569.00 TND</b>
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
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item carousel-item">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/iphone.jpg"
                            className="img-fluid"
                            alt="iPhone"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Apple iPhone</h4>
                          <p className="item-price">
                            <strike>369.00 TND</strike> <b>349.00 TND</b>
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
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/canon.jpg"
                            className="img-fluid"
                            alt="Canon"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Canon DSLR</h4>
                          <p className="item-price">
                            <strike>315.00 TND</strike> <b>250.00 TND</b>
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
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/pixel.jpg"
                            className="img-fluid"
                            alt="Pixel"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Google Pixel</h4>
                          <p className="item-price">
                            <strike>450.00 TND</strike> <b>418.00 TND</b>
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
                                <BsStarHalf />
                              </li>
                            </ul>
                          </div>
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="thumb-wrapper">
                        <span className="wish-icon">
                          <i className="fa fa-heart-o"></i>
                        </span>
                        <div className="img-box">
                          <img
                            src="/examples/images/products/watch.jpg"
                            className="img-fluid"
                            alt="Watch"
                          />
                        </div>
                        <div className="thumb-content">
                          <h4>Apple Watch</h4>
                          <p className="item-price">
                            <strike>350.00 TND</strike> <b>330.00 TND</b>
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
                          <a
                            className="btn btn-orange btn-sm"
                            href="/"
                            data-abc="true"
                          >
                            Add to Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="/myCarousel"
                data-slide="prev"
              >
                <i className="fa fa-angle-left"></i>
              </a>
              <a
                className="carousel-control-next"
                href="/myCarousel"
                data-slide="next"
              >
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="brands">
        <a href="#">
		<img src="//logo.clearbit.com/google.com?greyscale=true"/>
		<img src="//logo.clearbit.com/shopify.com?greyscale=true"/>
		<img src="//logo.clearbit.com/ethereum.org?greyscale=true"/>
		<img src="//logo.clearbit.com/tunisair.com?greyscale=true"/>
		<img src="//logo.clearbit.com/topnet.tn?greyscale=true"/>
        </a>
      </div>
    </div>
  );
};

export default Presentation;
