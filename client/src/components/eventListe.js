import "./../css/event.css";
const json = JSON.parse("[{},{},{},{},{},{},{},{},{},{},{},{},{}]");
const EventList = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        {json.map((item, key) => {
          return (
            <div className="col-4 Event">
              <div className="details position-relative">
                <div className="position-absolute background"></div>
                <div className="position-absolute w-100 dataEvent">
                  <div className="row">
                    <div className="col-9">
                      <p className="titleEvent">BSANDY DESERT</p>
                      <p>250 TND</p>
                    </div>
                    <div className="col-3">
                      <button className="btn btn-primary">Join</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
