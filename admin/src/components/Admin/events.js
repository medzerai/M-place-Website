import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Events
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Events;
