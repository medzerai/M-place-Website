import { Link } from "react-router-dom";
import { useState } from "react";
import { BiTrashAlt, BiPlayCircle, BiEdit } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import pic from "./../../../../meeting.jpg";
const ProductOwner = () => {
  const [show, setModifyShow] = useState(false);
  const [showDelete, setDeleteShow] = useState(false);
  const ModifyClose = () => setModifyShow(false);
  const ModifyShow = () => setModifyShow(true);

  const DeleteClose = () => setDeleteShow(false);
  const DeleteShow = () => setDeleteShow(true);
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item">Product Owner</li>
          <li className="breadcrumb-item active" aria-current="page">
            All Product Owner
          </li>
        </ol>
      </nav>

      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of Product Owner Verified</h1>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <th>
                <div className="data picture">logo</div>
              </th>
              <th>
                <div className="data">Name</div>
              </th>
              <th>
                <div className="data">Email</div>
              </th>
              <th>
                <div className="data">Products</div>
              </th>
              <th>
                <div className="data">Pack</div>
              </th>
              <th>
                <div className="data">Creation date</div>
              </th>
              <th>
                <div className="data">Actions</div>
              </th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="data picture">
                    <img src={pic} alt="" />
                  </div>
                </td>
                <td>
                  <div className="data">Lenovo</div>
                </td>
                <td>
                  <div className="data">contact@lenovo.com</div>
                </td>
                <td>
                  <div className="data">25 / 100</div>
                </td>
                <td>
                  <div className="data">
                    <div className="visibility gold">Gold</div>
                  </div>
                </td>
                <td>
                  <div className="data">12-05-2021 17:33:15</div>
                </td>
                <td>
                  <div className="actions">
                    <div className="action">
                      <BiPlayCircle />
                    </div>
                    <div className="action" onClick={DeleteShow}>
                      <BiTrashAlt />
                    </div>
                    <div className="action" onClick={ModifyShow}>
                      <BiEdit />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="data picture">
                    <img src={pic} alt="" />
                  </div>
                </td>
                <td>
                  <div className="data">Lenovo</div>
                </td>
                <td>
                  <div className="data">contact@lenovo.com</div>
                </td>
                <td>
                  <div className="data">25 / 50</div>
                </td>
                <td>
                  <div className="data">
                    <div className="visibility pro">Pro</div>
                  </div>
                </td>
                <td>
                  <div className="data">12-05-2021 17:33:15</div>
                </td>
                <td>
                  <div className="actions">
                    <div className="action">
                      <BiPlayCircle />
                    </div>
                    <div className="action" onClick={DeleteShow}>
                      <BiTrashAlt />
                    </div>
                    <div className="action" onClick={ModifyShow}>
                      <BiEdit />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductOwner;
