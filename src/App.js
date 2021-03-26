import { useState } from "react";

import "./App.css";
import Navigation from "./components/Navbar/Navigation";
import Home from "./components/Home/Home";
import {
  Switch,
  Route,
  withRouter,
  useHistory,
  Redirect,
} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Student from "./components/Student/student";

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const handleLogin = (user) => {
    setUser({ userId: 1, username: "jasonjohn12" });
    history.push("/dashboard");
  };
  return (
    <div className="App">
      <Navigation user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          path="/login"
          render={(props) => <Login {...props} {...{ handleLogin }} />}
        />
        <Route exact path="/register">
          <Register />
        </Route>

        <Route
          path="/dashboard"
          render={(props) => <Dashboard {...props} handleLogin={handleLogin} />}
        />
        <Route
          path="/student"
          render={(props) => <Student {...props} handleLogin={handleLogin} />}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
