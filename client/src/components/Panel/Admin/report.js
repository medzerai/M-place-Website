import { Link } from "react-router-dom";

const Reports = () => {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Reports
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Reports;
