import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/navbar.css";
import logo from "./../logo.svg";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";

var json =
  '[{"id":1,"categorie":"Vétements","sous-categorie":[{"id":120,"titre":"mode Homme","sous-sous-categ":[{"name":"pull"},{"name":"veste"},{"name":"T-shirt"},{"name":"chaussure"}]},{"id":120,"titre":"Mode Femme","sous-sous-categ":[{"name":"pull"},{"name":"veste"},{"name":"T-shirt"},{"name":"chaussure"}]},{"id":120,"titre":"sous-categ1","sous-sous-categ":[{"name":"nn1"},{"name":"nn2"},{"name":"nn3"},{"name":"nn4"}]},{"id":121,"titre":"sous-categ2","sous-sous-categ":[{"name":"kn5"},{"name":"nkndhdgd45"}]}]},{"id":2,"categorie":"categ2","sous-categorie":[{"id":122,"titre":"sous-categ3","sous-sous-categ":[{"name":"sjsh"},{"name":"uhded"},{"name":"szohudige"}]},{"id":123,"titre":"sous-categ4","sous-sous-categ":[{"name":"sqszsz"},{"name":"efrf"},{"name":"rfrtgrt"},{"name":"eferfe"}]}]}]';
json = JSON.parse(json);

function loadNavbarByCateg(idCateg) {
  var categ;
  for (var i = 0; i < json.length; i++) {
    if (json[i].id == idCateg) {
      categ = json[i];
      break;
    }
  }

  if (categ != null) {
    return categ["sous-categorie"].map((item, id) => {
      console.log("its inside");
      return (
        <div className="sous-categorie-bloc" key={id}>
          <Link
            to={"/" + categ.categorie + "/" + item.titre}
            className="title-sous-categ"
          >
            {item.titre}
          </Link>
          {item["sous-sous-categ"].map((sous_categ, idCateg) => {
            <Link
              to={
                "/" + categ.categorie + "/" + item.titre + "/" + sous_categ.name
              }
              key={idCateg}
            >
              {sous_categ.name}
            </Link>;
          })}
        </div>
      );
    });
  } else {
    return <div>Not found</div>;
  }
}

function hoverCateg(e) {
  const categs = document.querySelectorAll(".item-categ");
  for (const c of categs) {
    c.className = "item-categ";
  }
  e.target.className = "item-categ active";
  var sous_categ = "";
  const id = e.target.getAttribute("data-id");
  //console.log("id: " +id);
  /*  
  if(id != null){
    var x = loadNavbarByCateg(id)
    console.log(typeof x);
    ReactDOM.render(loadNavbarByCateg(id),document.querySelector(".sous-categ"));
  }
 */
  for (var i = 0; i < json.length; i++) {
    if (json[i]["id"] == id) {
      for (var j = 0; j < json[i]["sous-categorie"].length; j++) {
        sous_categ +=
          '<div class="sous-categorie-bloc"> <a href="/' +
          json[i]["categorie"].replaceAll(" ", "_") +
          "/" +
          json[i]["sous-categorie"][j]["titre"].replaceAll(" ", "_") +
          '" class="title-sous-categ">' +
          json[i]["sous-categorie"][j]["titre"] +
          "</a>";
        for (
          var k = 0;
          k < json[i]["sous-categorie"][j]["sous-sous-categ"].length;
          k++
        ) {
          sous_categ +=
            '<a href="/' +
            json[i]["categorie"].replaceAll(" ", "_") +
            "/" +
            json[i]["sous-categorie"][j]["titre"].replaceAll(" ", "_") +
            "/" +
            json[i]["sous-categorie"][j]["sous-sous-categ"][k][
              "name"
            ].replaceAll(" ", "_") +
            '">' +
            json[i]["sous-categorie"][j]["sous-sous-categ"][k]["name"] +
            "</a>";
        }
        sous_categ += "</div>";
      }
      document.querySelector(".sous-categ").innerHTML = sous_categ;
      break;
    }
  }
}

function loadNavbar() {
  if (window.innerWidth > 991) {
    return (
      <div className="col-200">
        <div className="categorie">Categories</div>
        <div className="dropdown-categorie position-absolute shadow">
          <div className="row margin-left-0">
            <div className="col-200 height-450">
              <ul className="liste-categorie">
                {json.map((item, key) => {
                  return (
                    <li
                      className="item-categ"
                      key={item.id}
                      data-id={item.id}
                      onMouseOver={hoverCateg}
                    >
                      <Link to={"/" + item.categorie.replaceAll(" ", "_")}>
                        {item.categorie}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-700">
              <div className="sous-categ"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-200">
        <div className="categorie" onClick={openSideBar}>
          <AiOutlineMenu className="menuCatgorie" />
          <p>Categories</p>
        </div>
        <div className="side-bar-categorie">
          <AiOutlineClose onClick={closeSideBar} className="closeBtn" />
          <ul className="liste-categorie">
            {json.map((item, i) => {
              return (
                <li key={i} data-id={item.id}>
                  <Link
                    onClick={closeSideBar}
                    to={"/" + item.categorie.replaceAll(" ", "_")}
                  >
                    <div className="bg-orange-categ">{item.categorie}</div>
                  </Link>

                  <ul>
                    {item["sous-categorie"].map((sous_item, key) => {
                      return (
                        <li key={sous_item.id} data-id={sous_item.id}>
                          <Link
                            onClick={closeSideBar}
                            to={
                              "/" +
                              item.categorie.replaceAll(" ", "_") +
                              "/" +
                              sous_item.titre.replaceAll(" ", "_")
                            }
                          >
                            <div className="bg-orange-categ">
                              {sous_item.titre}
                            </div>
                          </Link>

                          <ul>
                            {sous_item["sous-sous-categ"].map(
                              (sous_sous_categ, key) => {
                                return (
                                  <li key={key}>
                                    <Link
                                      onClick={closeSideBar}
                                      to={
                                        "/" +
                                        item.categorie.replaceAll(" ", "_") +
                                        "/" +
                                        sous_item.titre.replaceAll(" ", "_") +
                                        "/" +
                                        sous_sous_categ.name.replaceAll(
                                          " ",
                                          "_"
                                        )
                                      }
                                    >
                                      {sous_sous_categ.name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

function openSideBar() {
  const sb = document.querySelector(".side-bar-categorie");
  sb.className = "side-bar-categorie shadow-lg open";
}
function closeSideBar() {
  const sb = document.querySelector(".side-bar-categorie");
  sb.className = "side-bar-categorie shadow-lg";
}

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
                <Link to="/" className="font-weight-bold">
                  <img src={logo} draggable="false" alt="logo" />
                </Link>
              </div>
            </div>

            <div className="col-9  text-right">
              <span className="d-inline-block d-lg-none">
                <a
                  href="/"
                  className="text-primary site-menu-toggle js-menu-toggle py-5"
                >
                  <AiOutlineMenu />
                </a>
              </span>

              <nav
                className="site-navigation text-right ml-auto d-none d-lg-block"
                role="navigation"
              >
                <ul className="site-menu main-menu js-clone-nav ml-auto ">
                  <li
                    className={
                      !["events", "about", "blogs", "contact"].includes(
                        window.location.pathname.split("/")[1]
                      )
                        ? "active"
                        : ""
                    }
                  >
                    <Link to="/" className="nav-link">
                      Marketplace
                    </Link>
                  </li>
                  <li
                    className={
                      window.location.pathname.split("/")[1] === "events"
                        ? "active"
                        : ""
                    }
                  >
                    <Link to="/events" className="nav-link">
                      Events
                    </Link>
                  </li>
                  <li
                    className={
                      window.location.pathname.split("/")[1] === "about"
                        ? "active"
                        : ""
                    }
                  >
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </li>
                  <li
                    className={
                      window.location.pathname.split("/")[1] === "blogs"
                        ? "active"
                        : ""
                    }
                  >
                    <Link to="/blogs" className="nav-link">
                      Blog
                    </Link>
                  </li>
                  <li
                    className={
                      window.location.pathname.split("/")[1] === "contact"
                        ? "active"
                        : ""
                    }
                  >
                    <Link to="/contact" className="nav-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <nav className="marketplace-navbar">
        <div className="container">
          <div className="row position-relative margin-10p">
            {loadNavbar()}

            <div className="col pl-0">
              <div className="h-100">
                <button
                  className="navbar-toggler d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <form className="form-group d-none d-lg-flex">
                  <div className="search">
                    <input
                      className="search"
                      type="search"
                      placeholder="Cherchez un produit, une marque ou une catégorie"
                      aria-label="Search"
                    />
                  </div>
                  <button className="search-button" type="submit">
                    <AiOutlineSearch className="searchIconBtn" />
                  </button>
                </form>
              </div>
            </div>
            <div className="col-200 userDetailsNavbar">
              <FaUserAlt className="iconUser" />
              <Link to="/login">Sign In</Link>/
              <Link to="/register">Sign Up</Link>
              <FaShoppingCart className="iconCart" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
