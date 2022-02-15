import Template from "../components/template";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
const DashboardAdmin = () => {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Library</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default DashboardAdmin;
