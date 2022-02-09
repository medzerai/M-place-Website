import { React } from "react";
///////////////////////////////////////////
import { RiInstagramFill, RiTwitterFill, RiFacebookFill ,RiWhatsappFill} from "react-icons/ri";
import './../css/footer.css';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
        <footer class="footer-dark">
          <div class="container">
            <div class="row">
              <div class="col-sm-6 col-md-3 item">
                <h3>Services</h3>
                <ul>
                  <li>
                    <Link to="/">Market Place</Link>
                  </li>
                  <li>
                    <Link to="/events">Events</Link>
                  </li>
                  <li>
                    <Link  to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Blogs</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div class="col-sm-6 col-md-3 item">
                <h3>About</h3>
                <ul>
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">Team</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                </ul>
              </div>
              <div class="col-md-6 item text">
                <h3>M - Place</h3>
                <p>
                  Praesent sed lobortis mi. Suspendisse vel placerat ligula.
                  Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam
                  quis tristique lectus. Aliquam in arcu eget velit pulvinar
                  dictum vel in justo.
                </p>
              </div>
              <div class="col item social">
                <a href="#">
                <RiFacebookFill className="icon"/>
                </a>
                <a href="#">
                <RiTwitterFill className="icon"/>
                </a>
                <a href="#">
                <RiWhatsappFill className="icon"/>
                </a>
                <a href="#">
                  <RiInstagramFill className="icon"/>
                </a>
              </div>
            </div>
            <p class="copyright">M - Place © 2022</p>
          </div>
        </footer>

////////////////////////////////////
import { RiInstagramFill, RiTwitterFill, RiFacebookFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div className="h-100 w-100">
      <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-2">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    Market Place
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/events" className="nav-link p-0 text-muted">
                    Events
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/about" className="nav-link p-0 text-muted">
                    About
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/blogs" className="nav-link p-0 text-muted">
                    Blogs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/contact" className="nav-link p-0 text-muted">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-2">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-2">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="/" className="nav-link p-0 text-muted">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-4 offset-1">
              <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of whats new and exciting from us.</p>
                <div className="d-flex w-100 gap-2">
                  <label for="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex justify-content-between py-4 my-4 border-top">
            <p>© 2022 M-place, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-dark" href="/">
                  <RiFacebookFill />
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="/">
                  <RiTwitterFill />
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="/">
                  <RiInstagramFill />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
//////////////////////////////////
  );
};

export default Footer;
