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
import Product from "./product";
import Category from "./category";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";




function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/">
          <Navbar />
          <Presentation />
          <Footer />
        </Route>
        <Route exact path="/events">
          <Navbar />
          <Events />
          <Footer />
        </Route>
        <Route exact path="/about">
          <Navbar />
          <Events />
          <About />
        </Route>
        <Route exact path="/blogs">
          <Navbar />
          <Blogs />
          <Footer />
        </Route>
        <Route exact path="/contact">
          <Navbar />
          <Contact />
          <Footer />
        </Route>
        <Route exact path="/:categ">
          <Navbar />
          <Category/>
          <Footer />
        </Route>
        <Route exact path="/:categ/:sousCateg">
          <Navbar />
          <div>en cours</div>
          <Footer />
        </Route>
        <Route exact path="/:categ/:sousCateg/:sousSousCateg">
          <Navbar />
          <div>en cours</div>
          <Footer />
        </Route>
        <Route exact path="/:categ/:sousCateg/:sousSousCateg/:product">
          <Navbar />
          <Product/>
          <Footer />
        </Route>

        <Route exact path="*">
          <Erreur404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
