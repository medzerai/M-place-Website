import "./../../../css/Panel/templatePanel.css";
import logo from "./../../../logo.svg";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import RouterPanel from "./routerPanel";
function menuClick() {
  console.log("cliked");
  const el = document.querySelector(".sidebar");
  if (el.classList.contains("activeSideBar")) {
    el.classList.remove("activeSideBar");
  } else {
    el.classList.add("activeSideBar");
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
        <RouterPanel />
      </div>
    </div>
  );
};

export default Template;
