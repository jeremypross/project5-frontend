import React, { Component } from "react";
import { Link } from "react-router";
import update from "react-addons-update";

class SavedArticle extends Component {
  constructor() {
    super();

    this.state = {
      isVisible: {
        display: "block"
      }
    };
  }

  handleChange(event) {
    let newState = update(this.state, {
      $merge: {
        [event.target.name]: event.target.value
      }

    });

    this.setState(newState);
  }


  // DELETE request to delete saved article
  handleDelete() {
    fetch(`https://kitchen-sink-server.herokuapp.com/recipes/${this.props.id}/${this.props.user_id}`, {
      method: "DELETE"
    })
    .then(() => {
      this.setState({isVisible: {display: "none"}});
    })
    .catch((err) => {
      console.log('ERROR:', err);
    });
  }

  render() {
    return(
      <div style={this.state.isVisible}>
        <div className="dashboard-container">
          <div className="dashboard-item">
            <div className="dashboard-image">
              <h3 className="saved-item-title">{this.props.title}</h3>
              <img src={this.props.urlToImage} />
            </div>
          </div>
          <div className="dashboard-item">
            <p className="saved-content">Author: {this.props.author}</p>
            <p className="saved-content">Description: {this.props.description}</p>
            <p className="saved-content">Source Link: <a href={this.props.url} target="_blank">{this.props.url}</a></p>
            <Link to="/dashboard">
              <button onClick={this.handleDelete.bind(this)}>Remove Article</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SavedArticle;
