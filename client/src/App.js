import Navbar from "./components/Navbar";
import Presentation from "./components/Presentation";
import About from "./components/About";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Events from "./components/Events";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import Erreur404 from "./components/404";
import Product from "./components/product";
import Category from "./components/category";
import RegisterPO from "./components/registerPO/registerPO";
import Template from "./components/Panel/components/template";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/test">
          <RegisterPO />
        </Route>
        <Route exact path="/admin/product">
          <Template data={"product"} />
        </Route>
        <Route exact path="/admin/dashboard">
          <Template data={"dashboard"} />
        </Route>
        <Route exact path="/admin/users">
          <Template data={"users"} />
        </Route>
        <Route exact path="/admin/category">
          <Template data={"category"} />
        </Route>
        <Route exact path="/admin/productOwner">
          <Template data={"productOwner"} />
        </Route>
        <Route exact path="/admin/productOwnerNotVerified">
          <Template data={"productOwnerNotVerified"} />
        </Route>
        <Route exact path="/admin/productOwnerDeleted">
          <Template data={"productOwnerDeleted"} />
        </Route>
        <Route exact path="/admin/messages">
          <Template data={"messages"} />
        </Route>
        <Route exact path="/admin/reports">
          <Template data={"reports"} />
        </Route>
        <Route exact path="/admin/events">
          <Template data={"events"} />
        </Route>
        <Route exact path="/admin/blogs">
          <Template data={"blogs"} />
        </Route>
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
          <About />
          <Footer />
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
          <Category />
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
          <Product />
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
