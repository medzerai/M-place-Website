import Navbar from "./Navbar";
import Presentation from "./Presentation";
import About from "./About";
import Blogs from "./Blogs";
import Contact from "./Contact";
import Events from "./Events";
import Footer from "./footer";
import Login from "./login";
import Register from "./register";
import Erreur404 from "./404";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="">
          <Router>
            <div className="App">
              <Navbar />
              <Switch>
                <Route exact path="/">
                  <Presentation />
                </Route>
                <Route exact path="/events">
                  <Events />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/blogs">
                  <Blogs />
                </Route>
                <Route exact path="/contact">
                  <Contact />
                </Route>
              </Switch>
            </div>
            <Footer />
          </Router>
        </Route>
        <Route exact path="*">
          <Erreur404/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
