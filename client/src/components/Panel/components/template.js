import "./../../../css/Panel/templatePanel.css";
import logo from "./../../../logo.svg";
import React, { Component } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";
import Users from "../Admin/users";
import Products from "../Admin/product";
import Events from "../Admin/events";
import DashboardAdmin from "../Admin/dashboard";
import ProductOwnerNotVerified from "../Admin/productOwner/ProductOwnerNotVerified";
import ProductOwnerDeleted from "../Admin/productOwner/ProductOwnerDeleted";
import Messages from "../Admin/message";
import Category from "../Admin/category";
import Reports from "../Admin/report";
import Blogs from "../Admin/blogs";
import ProductOwner from "../Admin/productOwner/ProductOwner";
import { BiSubdirectoryRight } from "react-icons/bi";
import "bootstrap/dist/js/bootstrap.js";
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
    const content = () => {
      switch (this.props.data) {
        case "dashboard":
          return <DashboardAdmin />;
        case "product":
          return <Products />;
        case "users":
          return <Users />;
        case "category":
          return <Category />;
        case "productOwner":
          return <ProductOwner />;
        case "productOwnerNotVerified":
          return <ProductOwnerNotVerified />;
        case "productOwnerDeleted":
          return <ProductOwnerDeleted />;
        case "messages":
          return <Messages />;
        case "reports":
          return <Reports />;
        case "events":
          return <Events />;
        case "blogs":
          return <Blogs />;

        default:
          return <h1>No project match</h1>;
      }
    };
    return (
      <div className="template">
        <div className="sidebar">
          <div className="logoTemplate">
            <img src={logo} alt="" />
          </div>
          <div className="items">
            <ul>
              <li
                className={
                  window.location.pathname.split("/")[2] === "dashboard"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/admin/dashboard">
                  <p>Dashboard</p>
                </Link>
              </li>
              <li
                className={
                  window.location.pathname.split("/")[2] === "product"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/admin/product">
                  <p>Product</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[2] === "users"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/admin/users">
                  <p>Users</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[2] === "category"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/admin/category">
                  <p>Category</p>
                </Link>
              </li>

              <li
                className={
                  [
                    "productOwner",
                    "productOwnerNotVerified",
                    "productOwnerDeleted",
                  ].includes(window.location.pathname.split("/")[2])
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
                      <Link to="/admin/productOwner">
                        <p>
                          <BiSubdirectoryRight /> All Product Owner
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/productOwnerNotVerified">
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
                  window.location.pathname.split("/")[2] === "messages"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/admin/messages">
                  <p>Messages</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[2] === "reports"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/admin/reports">
                  <p>Reports</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[2] === "events"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/admin/events">
                  <p>Events</p>
                </Link>
              </li>

              <li
                className={
                  window.location.pathname.split("/")[2] === "blogs"
                    ? "item active"
                    : "item"
                }
              >
                <Link to="/admin/blogs">
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
          <div className="ContentTemplate">{content()}</div>
        </div>
      </div>
    );
  }
}
