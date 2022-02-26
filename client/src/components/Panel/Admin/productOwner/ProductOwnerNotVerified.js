import { Link } from "react-router-dom";
import { useState } from "react";
import { BiXCircle, BiPlayCircle, BiCheckCircle } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import pic from "./../../../../meeting.jpg";
const ProductOwnerNotVerified = () => {
  const [showDetails, setDetailsShow] = useState(false);
  const [showRefuse, setRefuseShow] = useState(false);
  const [showAccept, setAcceptShow] = useState(false);

  const DetailsClose = () => setDetailsShow(false);
  const DetailsShow = () => setDetailsShow(true);

  const RefuseClose = () => setRefuseShow(false);
  const RefuseShow = () => setRefuseShow(true);

  const AcceptClose = () => setAcceptShow(false);
  const AcceptShow = () => setAcceptShow(true);
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
      id: 12545,
      name: "lenovo",
      logo: "https://logo.clearbit.com/lenovo.com",
      pack: 2,
      date: "12-05-2021 17:33:15",
      email: "contact@lenovo.com",
    },
    {
      id: 12485,
      name: "apple",
      logo: "https://logo.clearbit.com/apple.com",
      pack: 1,
      date: "03-08-2022 17:33:15",
      email: "Admin@apple.com",
    },
    {
      id: 128485,
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
                        <img src={PO.logo} alt="" />
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
                        <div className="action" onClick={DetailsClose}>
                          <BiPlayCircle />
                        </div>
                        <div className="action" onClick={RefuseClose}>
                          <BiXCircle />
                        </div>
                        <div className="action" onClick={AcceptClose}>
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
    </div>
  );
};

export default ProductOwnerNotVerified;
