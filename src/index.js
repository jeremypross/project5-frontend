import React from "react";
import ReactDom from "react-dom";
import { Route, Router, browserHistory } from "react-router";

import "./styles/normalize.css";
import "./styles/bootstrap.min.css";
import "./styles/style.css";

import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";



ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
  </Router>
  , document.getElementById("app")
);
