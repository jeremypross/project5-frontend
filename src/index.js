import React from "react";
import ReactDom from "react-dom";
import { Route, Router, browserHistory } from "react-router";

import "./styles/normalize.css";
import "./styles/bootstrap.min.css";
import "./styles/style.css";

import Homepage from "./components/Homepage/Homepage";

ReactDom.render(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
  </Router>
  , document.getElementById("app")
);
