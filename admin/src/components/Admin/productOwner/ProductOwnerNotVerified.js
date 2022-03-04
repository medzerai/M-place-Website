import { Link } from "react-router-dom";
import { useState } from "react";
import { BiXCircle, BiPlayCircle, BiCheckCircle } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import pic from "./../../../meeting.jpg";
const ProductOwnerNotVerified = () => {
  //modal details
  const [showDetails, setDetailsShow] = useState(false);
  const DetailsClose = () => setDetailsShow(false);
  const DetailsShow = () => setDetailsShow(true);

  // modal Refuse
  const [showRefuse, setRefuseShow] = useState(false);
  const RefuseClose = () => setRefuseShow(false);
  const RefuseShow = () => setRefuseShow(true);

  //Modal Accept
  const [showAccept, setAcceptShow] = useState(false);
  const AcceptClose = () => setAcceptShow(false);
  const AcceptShow = () => setAcceptShow(true);

  //id for the fonctionality of Modal
  const [POToRefuse, setPOToRefuse] = useState(0);
  const [POToAccept, setPOToAccept] = useState(0);
  const [POToDetails, setPOToDetails] = useState(0);

  //data of modal detils
  const [dataDetails, setDataDetails] = useState({
    id: 2121212,
    name: "lenovo",
    logo: "https://logo.clearbit.com/lenovo.com",
    pack: 2,
    date: "12-05-2021 17:33:15",
    email: "contact@lenovo.com",
  });
  function ChargeDataDetails(id) {
    //import data with api
    setDataDetails({
      id: id,
      name: "chanel",
      logo: "https://logo.clearbit.com/chanel.com",
      pack: 2,
      date: "06-01-2022 17:33:15",
      email: "marketing@chanel.com",
    });
    DetailsShow();
  }
  function RefusePO() {
    if (POToRefuse !== 0) {
      //api refuse with id of POToRefuse
      console.log(POToRefuse);
      //this next 2 line inside the fetch 'its the success of function '
      setPOToRefuse(0);
      RefuseClose();
    }
  }
  function AcceptPO() {
    if (POToAccept !== 0) {
      //api refuse with id of POToRefuse
      console.log(POToAccept);
      //this next 2 line inside the fetch 'its the success of function '
      setPOToAccept(0);
      AcceptClose();
    }
  }
  function findPack(pack) {
    var classPack = "";
    var NamePack = "";
    switch (pack) {
      case 1:
        classPack = "visibility gold";
        NamePack = "Gold";
        break;
      case 2:
        classPack = "visibility pro";
        NamePack = "Pro";
        break;
      default:
        classPack = "visibility pro";
        NamePack = "Pro";
        break;
    }
    return (
      <td>
        <div className="data">
          <div className={classPack}>{NamePack}</div>
        </div>
      </td>
    );
  }
  const [POs, setPOs] = useState([
    {
      id: 66666,
      name: "lenovo",
      logo: "https://logo.clearbit.com/lenovo.com",
      pack: 2,
      date: "12-05-2021 17:33:15",
      email: "contact@lenovo.com",
    },
    {
      id: 77777,
      name: "apple",
      logo: "https://logo.clearbit.com/apple.com",
      pack: 1,
      date: "03-08-2022 17:33:15",
      email: "Admin@apple.com",
    },
    {
      id: 88888,
      name: "chanel",
      logo: "https://logo.clearbit.com/chanel.com",
      pack: 2,
      date: "06-01-2022 17:33:15",
      email: "marketing@chanel.com",
    },
  ]);
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Admin</Link>
          </li>
          <li className="breadcrumb-item">Product Owner</li>
          <li className="breadcrumb-item active" aria-current="page">
            Product Owner Not Verified
          </li>
        </ol>
      </nav>
      <div className="cardTemplate shadow-sm">
        <div className="title-cardTemplate">
          <h1>List of Product Owner Not Verified</h1>
        </div>
        <div className="content-cardTemplate">
          <table>
            <thead>
              <tr>
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
                  <div className="data">Pack</div>
                </th>
                <th>
                  <div className="data">Creation date</div>
                </th>
                <th>
                  <div className="data">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {POs.map((PO) => {
                return (
                  <tr key={PO.id}>
                    <td>
                      <div className="data picture">
                        <img src={PO.logo} alt={PO.name} draggable="false" />
                      </div>
                    </td>
                    <td>
                      <div className="data">{PO.name}</div>
                    </td>
                    <td>
                      <div className="data">{PO.email}</div>
                    </td>
                    {findPack(PO.pack)}
                    <td>
                      <div className="data">{PO.date}</div>
                    </td>
                    <td>
                      <div className="actions">
                        <div
                          className="action"
                          onClick={() => {
                            ChargeDataDetails(PO.id);
                          }}
                        >
                          <BiPlayCircle />
                        </div>
                        <div
                          className="action"
                          onClick={() => {
                            setPOToRefuse(PO.id);
                            RefuseShow();
                          }}
                        >
                          <BiXCircle />
                        </div>
                        <div
                          className="action"
                          onClick={() => {
                            setPOToAccept(PO.id);
                            AcceptShow();
                          }}
                        >
                          <BiCheckCircle />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={showDetails}
        onHide={DetailsClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="w-100">
            <tr>
              <td>ID</td>
              <td>{dataDetails.id}</td>
            </tr>
            <tr>
              <td>Logo</td>
              <td>
                <img
                  src={dataDetails.logo}
                  alt={dataDetails.name}
                  draggable="false"
                />
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{dataDetails.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{dataDetails.email}</td>
            </tr>{" "}
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DetailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showRefuse}
        onHide={RefuseClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Refuse</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really refuse ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={RefuseClose}>
            No
          </Button>
          <Button variant="danger" onClick={RefusePO}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showAccept}
        onHide={AcceptClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Accept</Modal.Title>
        </Modal.Header>
        <Modal.Body>You wanna really accpet ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={AcceptClose}>
            No
          </Button>
          <Button variant="danger" onClick={AcceptPO}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductOwnerNotVerified;
