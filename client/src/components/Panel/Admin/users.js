import { Link } from "react-router-dom";
import pic from "./../../../meeting.jpg";
import ReactEditor from "./../components/reactEditor.js";
import { useState } from "react";
import { BiTrashAlt, BiPlayCircle, BiEdit } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";

const Users = () => {
  const [show, setModifyShow] = useState(false);
  const [showDelete, setDeleteShow] = useState(false);
  const ConsultClose = () => setModifyShow(false);
  const ConsultShow = () => setModifyShow(true);

  const DeleteClose = () => setDeleteShow(false);
  const DeleteShow = () => setDeleteShow(true);
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Users
          </li>
        </ol>
      </nav>

      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of products</h1>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <th>
                <div className="data picture"></div>
              </th>
              <th>
                <div className="data">Full name</div>
              </th>
              <th>
                <div className="data">Phone</div>
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
                  <div className="data">Mohamed ben Salah</div>
                </td>
                <td>
                  <div className="data">20 874 254</div>
                </td>
                <td>
                  <div className="data">12-05-2021 17:33:15</div>
                </td>
                <td>
                  <div className="actions">
                    <div className="action" onClick={ConsultShow}>
                      <BiPlayCircle />
                    </div>
                    <div className="action" onClick={DeleteShow}>
                      <BiTrashAlt />
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
                  <div className="data">Mohamed ben Salah</div>
                </td>
                <td>
                  <div className="data">20 874 254</div>
                </td>
                <td>
                  <div className="data">12-05-2021 17:33:15</div>
                </td>
                <td>
                  <div className="actions">
                    <div className="action" onClick={ConsultShow}>
                      <BiPlayCircle />
                    </div>
                    <div className="action" onClick={DeleteShow}>
                      <BiTrashAlt />
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
                  <div className="data">Mohamed ben Salah</div>
                </td>
                <td>
                  <div className="data">20 874 254</div>
                </td>
                <td>
                  <div className="data">12-05-2021 17:33:15</div>
                </td>
                <td>
                  <div className="actions">
                    <div className="action" onClick={ConsultShow}>
                      <BiPlayCircle />
                    </div>
                    <div className="action" onClick={DeleteShow}>
                      <BiTrashAlt />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={show}
        onHide={ConsultClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Consult user</Modal.Title>
        </Modal.Header>
        <Modal.Body>consult</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ConsultClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showDelete}
        onHide={DeleteClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really delete ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DeleteClose}>
            No
          </Button>
          <Button variant="danger">Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
