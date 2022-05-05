import Template from "../components/template";
import ReactEditor from "../components/reactEditor";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
const Blogs = () => {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Blogs
          </li>
        </ol>
      </nav>
      <ReactEditor />
    </div>
  );
};

export default Blogs;
