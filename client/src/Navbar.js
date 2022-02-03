import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/navbar.css";

var json = '[{"id":1,"categorie":"categ1","sous-categorie":[{"id":120,"titre":"sous-categ1","sous-sous-categ":[{"name":"nn1"},{"name":"nn2"},{"name":"nn3"},{"name":"nn4"}]},{"id":120,"titre":"sous-categ1","sous-sous-categ":[{"name":"nn1"},{"name":"nn2"},{"name":"nn3"},{"name":"nn4"}]},{"id":120,"titre":"sous-categ1","sous-sous-categ":[{"name":"nn1"},{"name":"nn2"},{"name":"nn3"},{"name":"nn4"}]},{"id":121,"titre":"sous-categ2","sous-sous-categ":[{"name":"kn5"},{"name":"nkndhdgd45"}]}]},{"id":2,"categorie":"categ2","sous-categorie":[{"id":122,"titre":"sous-categ3","sous-sous-categ":[{"name":"sjsh"},{"name":"uhded"},{"name":"szohudige"}]},{"id":123,"titre":"sous-categ4","sous-sous-categ":[{"name":"sqszsz"},{"name":"efrf"},{"name":"rfrtgrt"},{"name":"eferfe"}]}]}]'
json = JSON.parse(json);



 
function hoverCateg(e){
  const categs = document.querySelectorAll('.item-categ');
  for(const c of categs){
    c.className="item-categ";
  }
  e.target.className="item-categ active";
  var sous_categ='';
  const id= e.target.getAttribute('data-id');
  for(var i=0; i<json.length;i++){ 
    if (json[i]["id"] == id){
      for(var j=0;j<json[i]["sous-categorie"].length;j++){
        sous_categ += '<div class="sous-categorie-bloc"> <a href="/'+json[i]["categorie"]+'/'+json[i]["sous-categorie"][j]["titre"]+'" class="title-sous-categ">'+json[i]["sous-categorie"][j]["titre"]+'</a>';
        for(var k=0;k<json[i]["sous-categorie"][j]["sous-sous-categ"].length;k++){
          sous_categ += '<a href="/'+json[i]["categorie"]+'/'+json[i]["sous-categorie"][j]["titre"]+'/'+json[i]["sous-categorie"][j]["sous-sous-categ"][k]["name"]+'">'+json[i]["sous-categorie"][j]["sous-sous-categ"][k]["name"]+"</a>";
        } 
        sous_categ+='</div>';
      } 
      document.querySelector(".sous-categ").innerHTML = sous_categ;
      break;
    }
  }
}  

function loadNavbar(kk){
  if(kk ==0){
    return(
      <div>hello 0</div>
    )
  }else{
    return(
      <div>hello other</div>
    )
  }
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
              <div className="dropdown-categorie position-absolute">
                <div className="row margin-left-0">
                  <div className="col-200">
                    <ul className="liste-categorie">
                      { 
                        json.map((item,key)=>{
                          return(
                            <li className="item-categ" key={item.id} data-id={item.id} onMouseOver={hoverCateg}>{item.categorie}</li>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className="col-700">
                    <div className="sous-categ"> 
                    </div>
                  </div>
                </div>
              </div>
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
