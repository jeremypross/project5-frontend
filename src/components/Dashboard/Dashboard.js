import React, { Component } from "react";
import { browserHistory } from "react-router";

import UserNav from "../Nav/UserNav";
import SavedArticle from "../Dashboard/SavedArticle";


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      user_id: 0,
      comment: "",
      article: {}
    };
  }

  // checks for Token in localStorage - if no token push user to dashboard
  componentWillMount() {
    if (!localStorage.getItem('MyToken')) {
      browserHistory.push('/login');
    }
  }

  // GET request to authorize token for dashboard access and find all users's saved recipes
  componentDidMount() {
    fetch('http://localhost:3000/users/dashboard', {
      method: "GET",
      headers: {
        "Authorization": window.localStorage.getItem("MyToken")
      }
    })
    .then((results) => {
      results.json().then((data) => {
        this.setState({ articles: data.data });
        this.setState({ user_id: data.user_id });
        window.localStorage.setItem('user_id', this.state.user_id);
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
      browserHistory.push('/login');
    });
  }

  render() {
    return(
      <div id="dashboard">

        <UserNav />
        <h3>SAVED ARTICLES</h3>
        {this.state.articles.map((recipe) => {
          return(
            <div key={recipe.id}>
              <SavedArticle
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
