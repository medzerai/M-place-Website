import { Link } from "react-router-dom";
import pic from "./../../../meeting.jpg";
import { useState } from "react";
import { BiTrashAlt, BiPlayCircle, BiEdit } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
const Products = () => {
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
          <li className="breadcrumb-item active" aria-current="page">
            Producs
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
                <div className="data">Name</div>
              </th>
              <th>
                <div className="data">Price</div>
              </th>
              <th>
                <div className="data">Orders</div>
              </th>
              <th>
                <div className="data">Visibility</div>
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
                <td className="name">
                  <div className="data">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nulla iure explicabo inventore consequatur, sint ex pariatur
                    a, reiciendis laboriosam ab neque molestiae sequi magnam
                    nostrum. Architecto exercitationem sunt ut consequatur?
                  </div>
                </td>
                <td>
                  <div className="data">10020.00 TND</div>
                </td>
                <td>
                  <div className="data">25</div>
                </td>
                <td>
                  <div className="data">
                    <div className="visibility visible">Visible</div>
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
                <td className="name">
                  <div className="data">Lorem ipsum dolor sit</div>
                </td>
                <td>
                  <div className="data">120.00 TND</div>
                </td>
                <td>
                  <div className="data">99999</div>
                </td>
                <td>
                  <div className="data">
                    <div className="visibility hidden">Hidden</div>
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
      <Modal
        show={show}
        onHide={ModifyClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ModifyClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
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

export default Products;
