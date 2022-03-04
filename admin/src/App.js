import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import logo from "./logo.svg";
import Users from "./components/Admin/users";
import Products from "./components/Admin/product";
import Events from "./components/Admin/events";
import DashboardAdmin from "./components/Admin/dashboard";
import ProductOwnerNotVerified from "./components/Admin/productOwner/ProductOwnerNotVerified";
import ProductOwnerDeleted from "./components/Admin/productOwner/ProductOwnerDeleted";
import Messages from "./components/Admin/message";
import Category from "./components/Admin/category";
import Reports from "./components/Admin/report";
import Blogs from "./components/Admin/blogs";
import "./css/templatePanel.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/components.css";
import { BiSubdirectoryRight } from "react-icons/bi";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import ProductOwner from "./components/Admin/productOwner/ProductOwner";
function menuClick() {
  const elementContent = document.querySelector(".content");
  const element = document.querySelector(".sidebar");
  if (element.classList.contains("activeSideBar")) {
    element.classList.remove("activeSideBar");
    elementContent.classList.remove("contentFull");
  } else {
    element.classList.add("activeSideBar");
    elementContent.classList.add("contentFull");
  }
}
export default class Responsive extends Component {
  render() {
    return (
      <Router>
        <div className="template">
          <div className="sidebar">
            <div className="logoTemplate">
              <img src={logo} alt="" />
            </div>
            <div className="items">
              <ul>
                <li
                  className={
                    window.location.pathname.split("/")[1] === "dashboard"
                      ? "item active"
                      : "item"
                  }
                >
                  <Link to="/dashboard">
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li
                  className={
                    window.location.pathname.split("/")[1] === "product"
                      ? "item active"
                      : "item"
                  }
                >
                  <Link to="/product">
                    <p>Product</p>
                  </Link>
                </li>

                <li
                  className={
                    window.location.pathname.split("/")[1] === "users"
                      ? "item active"
                      : "item"
                  }
                >
                  <Link to="/users">
                    <p>Users</p>
                  </Link>
                </li>

                <li
                  className={
                    window.location.pathname.split("/")[1] === "category"
                      ? "item active"
                      : "item"
                  }
                >
                  <Link to="/category">
                    <p>Category</p>
                  </Link>
                </li>

                <li
                  className={
                    [
                      "productOwner",
                      "productOwnerNotVerified",
                      "productOwnerDeleted",
                    ].includes(window.location.pathname.split("/")[1])
                      ? "item active"
                      : "item"
                  }
                >
                  <p data-bs-toggle="collapse" data-bs-target="#productOwner">
                    Product Owner
                  </p>
                  <div className="collapse" id="productOwner">
                    <ul>
                      <li>
                        <Link to="/productOwner">
                          <p>
                            <BiSubdirectoryRight /> All Product Owner
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/productOwnerNotVerified">
                          <p>
                            <BiSubdirectoryRight /> PO not verified
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/productOwnerDeleted">
                          <p>
                            <BiSubdirectoryRight /> PO deleted
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className={
                    window.location.pathname.split("/")[1] === "messages"
                      ? "item active"
                      : "item"
                  }
                >
                  <Link to="/messages">
                    <p>Messages</p>
                  </Link>
                </li>

                <li
                  className={
                    window.location.pathname.split("/")[1] === "reports"
                      ? "item active"
                      : "item"
                  }
                >
                  <Link to="/reports">
                    <p>Reports</p>
                  </Link>
                </li>

                <li
                  className={
                    window.location.pathname.split("/")[1] === "events"
                      ? "item active"
                      : "item"
                  }
                >
                  <Link to="/events">
                    <p>Events</p>
                  </Link>
                </li>

                <li
                  className={
                    window.location.pathname.split("/")[1] === "blogs"
                      ? "item active"
                      : "item"
                  }
                >
                  <Link to="/blogs">
                    <p>Blogs</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="content">
            <div className="navbarTemplate">
              <div className="iconMenu" onClick={menuClick}>
                <AiOutlineMenuUnfold />
              </div>
            </div>
            <div className="ContentTemplate">
              <Switch>
                <Route exact path="/product">
                  <Products />
                </Route>
                <Route exact path="/dashboard">
                  <DashboardAdmin />
                </Route>
                <Route exact path="/users">
                  <Users />
                </Route>
                <Route exact path="/category">
                  <Category />
                </Route>
                <Route exact path="/productOwner">
                  <ProductOwner />
                </Route>
                <Route exact path="/productOwnerNotVerified">
                  <ProductOwnerNotVerified />
                </Route>
                <Route exact path="/productOwnerDeleted">
                  <ProductOwnerDeleted />
                </Route>
                <Route exact path="/messages">
                  <Messages />
                </Route>
                <Route exact path="/reports">
                  <Reports />
                </Route>
                <Route exact path="/events">
                  <Events />
                </Route>
                <Route exact path="/blogs">
                  <Blogs />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
