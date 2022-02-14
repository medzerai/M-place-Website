import "./../../../css/Panel/templatePanel.css";
import logo from "./../../../logo.svg";
import { AiOutlineMenuUnfold } from "react-icons/ai";

function menuClick() {
  console.log("cliked");
  const el = document.querySelector(".sidebar");
  if (el.classList.contains("active")) {
    console.log("heree");
    el.classList.remove("active");
  } else {
    console.log("else");
    el.classList.add("active");
  }
}
const Template = () => {
  return (
    <div className="template">
      <div className="sidebar">
        <div className="logoTemplate">
          <img src={logo} alt="" />
        </div>
        <div className="items">
          <ul>
            <li className="item">Dashboard</li>
            <li className="item">Product</li>
            <li className="item">Exemple 1</li>
            <li className="item">Exemple 1</li>
            <li className="item">Exemple 1</li>
          </ul>
        </div>
      </div>
      <div className="content">
        <div className="navbarTemplate">
          <div className="iconMenu" onClick={menuClick}>
            <AiOutlineMenuUnfold />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
