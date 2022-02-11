import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

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
var data = JSON.parse("[{},{},{}]");
const Review = () => {
  return (
    <div>
      {data.map((item, key) => {
        return (
          <div className="itemReview" key={key}>
            <div className="row">
              <div className="w-120">
                <div className="vectorUser">
                  <img src="https://picsum.photos/id/247/500/500" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="UserName">Salah ben Salah</div>
                <div className="star-rating px-3">
                  <ul className="list-inline">
                    {showStars(5)}
                    <li className="list-inline-item review"> 12 April 2021</li>
                  </ul>
                </div>
                <div className="commante">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Officiis deserunt dignissimos rerum, ipsam mollitia aperiam
                  dolores dicta beatae alias, eum, labore ducimus necessitatibus
                  atque libero quam possimus. Optio, placeat quaerat.
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Review;
