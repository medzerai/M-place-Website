import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css";

const Navbar = () => {
  return (
    <div className="header">
      <div className="ContactHeader"></div>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <header className="site-navbar">
        <div className="container">
          <div className="row align-items-center position-relative">
            <div className="col-3">
              <div className="site-logo">
                <a href="index.html" className="font-weight-bold">
                  Brand
                </a>
              </div>
            </div>

            <div className="col-9  text-right">
              <span className="d-inline-block d-lg-none">
                <a
                  href="#"
                  className="text-primary site-menu-toggle js-menu-toggle py-5"
                >
                  <span className="icon-menu h3 text-white">hhh</span>
                </a>
              </span>

              <nav
                className="site-navigation text-right ml-auto d-none d-lg-block"
                role="navigation"
              >
                <ul className="site-menu main-menu js-clone-nav ml-auto ">
                  <li className="active">
                    <a href="#" className="nav-link">
                      Marketplace
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <nav className="marketplace-navbar">
        <div className="container">
          <div className="row position-relative">
            <div className="col-2">
              <div className="categorie">Categories</div>
              <ul className="dropdown-categorie position-absolute">
                <li>categ 1</li>
                <li>categ 2</li>
                <li>categ 3</li>
              </ul>
            </div>
            <div className="col-6"></div>
            <div className="col-4"></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
