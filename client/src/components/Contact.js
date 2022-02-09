import { React } from "react";
import "./../css/contact.css";
const Contact = () => {
  return (
    <div className="container info-container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center text-info">Contact Us</h2>
        </div>
        <div className="col-12 col-md-6 contact-box">
          <p className="contact-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel nam
            magnam natus tempora cumque, aliquam deleniti voluptatibus voluptas.
            Repellat vel, et itaque commodi iste ab, laudantium voluptas
            deserunt nobis.
          </p>
          <div className="info-box">
            <span className="text-uppercase text-info">Address: </span>
            <span>Technopole Ghazela, Ariana, Tunisie</span>
          </div>
          <div className="info-box">
            <span className="text-uppercase text-info">Email: </span>
            <span>contact@m-carketplace.tn </span>
          </div>
          <div className="info-box">
            <span className="text-uppercase text-info">Phone: </span>
            <span>+216 20 202 020 </span>
          </div>
        </div>
        <div className="col-12 col-md-6 site-form">
          <form className="my-form">
            <div className="form-group mb-3">
              <label className="form-label visually-hidden" for="firstname">
                First Name
              </label>
              <input
                id="firstname"
                className="form-control"
                type="text"
                name="firstname"
                placeholder="First Name"
                autofocus
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label visually-hidden" for="lastname">
                Last Name
              </label>
              <input
                id="lastname"
                className="form-control"
                type="text"
                name="lastname"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label visually-hidden" for="phonenumber">
                Phone Number
              </label>
              <input
                id="phonenumber"
                className="form-control"
                type="tel"
                name="phonenumber"
                required
                placeholder="Phone"
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label visually-hidden" for="email">
                Email Address
              </label>
              <input
                id="email"
                className="form-control"
                type="text"
                name="email"
                required
                placeholder="Email"
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label visually-hidden" for="messages">
                Last Name
              </label>
              <textarea
                className="form-control"
                name="messages"
                required
                placeholder="Message"
                rows="8"
              ></textarea>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
