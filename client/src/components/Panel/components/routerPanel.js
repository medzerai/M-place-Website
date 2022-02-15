import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardAdmin from "../Admin/dashboard";
const RouterPanel = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin">
          <DashboardAdmin />
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterPanel;
