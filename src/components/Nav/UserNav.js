import React, { Component } from "react";
import { Link, browserHistory } from "react-router";

class UserNav extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    window.localStorage.removeItem("MyToken");
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("loggedin");
    browserHistory.push('/');
  }

  render() {
    return (
      <div id="nav">
        <ul id="nav-bar">
          <h1>Dashboard</h1>
          <li>
            <Link className="nav-link" to="/">SEARCH</Link>
          </li>
          <li>
            <Link className="nav-link" to="/login" onClick={this.handleSubmit.bind(this)}>LOG OUT</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserNav;
