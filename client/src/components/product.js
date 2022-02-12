import { useParams } from "react-router-dom";
import "./../css/product.css";
import Specification from "./productComponents/specification";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { Tab, ListGroup } from "react-bootstrap";
import ImagesProduct from "./productComponents/images";
import Review from "./productComponents/review";
function showStars(stars) {
  const nbr = Math.trunc(stars);
  var rows = [];
  for (var i = 0; i < nbr; i++) {
    rows.push(
      <li className="list-inline-item">
        <BsStarFill />
      </li>
    );
  }
  if (stars !== nbr) {
    rows.push(
      <li className="list-inline-item">
        <BsStarHalf />
      </li>
    );
    for (i = 0; i < 4 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  } else {
    for (i = 0; i < 5 - nbr; i++) {
      rows.push(
        <li className="list-inline-item">
          <BsStar />
        </li>
      );
    }
  }
  return rows;
}

const Product = () => {
  const { categ, sousCateg, sousSousCateg, product } = useParams();
  return (
    <div className="container mt-5">
      <div className="cart-product">
        <div className="row">
          <div className="col-12 col-lg-5">
            <ImagesProduct />
          </div>
          <div className="col-12 col-lg-7">
            <div className="container pl-4">
              <div className="title">Title of product number 1</div>
              <div className="contentProduct">
                <div className="star-rating px-3">
                  <ul className="list-inline">
                    {showStars(5)}
                    <li className="list-inline-item review">8 Reviews</li>
                  </ul>
                </div>
                <div className="description px-3">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
                  ad doloremque eos corrupti doloribus itaque vero, possimus
                  consectetur repellat suscipit alias! Itaque suscipit error
                  delectus corrupti. Inventore, accusantium. Numquam, magnam!
                </div>
                <div className="statusOfProduct">
                  <div className="row">
                    <div className="col">In Stock</div>
                    <div className="col">Marque : ASUS</div>
                    <div className="col">SKU : ASUS-21254</div>
                  </div>
                </div>
                <div className="priceProduct">
                  700.00 <span className="orange">TND</span>
                </div>
                <div className="selection mt-3">
                  <div className="row itemSelection pb-3">
                    <div className="col-4 itemTitle">Color</div>
                    <div className="col-8 itemChoise">
                      <select name="" id="">
                        <option value="red">red</option>
                        <option value="green">green</option>
                        <option value="blue">blue</option>
                        <option value="black">black</option>
                      </select>
                    </div>
                  </div>
                  <div className="row itemSelection pb-3">
                    <div className="col-4 itemTitle">RAM</div>
                    <div className="col-8 itemChoise">
                      <select name="" id="">
                        <option value="4gb">4 GB</option>
                        <option value="8gb">8 GB</option>
                        <option value="12gb">12 GB</option>
                        <option value="16gb">16 GB</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <ListGroup horizontal>
              <ListGroup.Item action href="#link1">
                Description
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Specification
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                Review
              </ListGroup.Item>
            </ListGroup>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">Description</Tab.Pane>
              <Tab.Pane eventKey="#link2" className="m-5">
                <Specification />
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <Review />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

export default Product;
