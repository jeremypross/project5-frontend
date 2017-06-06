import React, { Component } from "react";
import update from "react-addons-update";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      source: {
        query: ''
      },
      article: {}
    };
  }

  handleChange(event) {
    let newState = update(this.state, {
      source: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
  }

  findArticles() {
    fetch(`http://localhost:3000/api/${this.state.source.query}`, {
      method: "GET",
      datatype: "JSON",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((results) => {
      console.log('results of GET request to find articles', results);
      results.json()
      .then((data) => {
        this.setState( { articles: data.articles });
        console.log('DATA IN GET REQUEST', data);
        this.setState({ source: { query: "" }});
      });
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3000/articles`, {
      method: "POST",
      body: JSON.stringify({
        article: {
          author: `${this.state.article.author}`,
          title: `${this.state.article.title}`,
          description: `${this.state.article.description}`,
          url: `${this.state.article.url}`,
          urlToImage: `${this.state.article.urlToImage}`,
          published: `${this.state.article.published}`,
          user_id: window.localStorage.getItem('user_id')
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      // push to dashboard
      // this.props.router.push('/dashboard');
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
  }

  render() {
    return (
      <div id="articles-page">
        {/* SEARCH BAR */}
        <div id="search-input">
          <h2>Top News</h2>
          <select name="query" onChange={this.handleChange.bind(this)} value={this.state.source.query} placeholder="Search News Sources" >
            <option value="">Choose your Source!</option>
            <option value="abc-news-au">ABC News (AU)</option>
            <option value="al-jazeera-english">Al Jazeera</option>
            <option value="ars-technica">Ars Technica</option>
            <option value="associated-press">AP</option>
            <option value="bbc-news">BBC NEWS</option>
            <option value="bbc-sport">BBC Sport</option>
            <option value="bloomberg">Bloomberg</option>
            <option value="business-insider">Business Insider</option>
            <option value="buzzfeed">Buzzfeed</option>
            <option value="cnbc">CNBC</option>
            <option value="cnn">CNN</option>
            <option value="daily-mail">Daily Mail</option>
            <option value="engadget">Engadget</option>
            <option value="entertainment-weekly">Entertainment Weekly</option>
            <option value="espn">ESPN</option>
            <option value="financial-times">Financial Times</option>
            <option value="fortune">Fortune</option>
            <option value="fox-sports">Fox Sports</option>
            <option value="google-news">Google News</option>
            <option value="hacker-news">Hacker News</option>
            <option value="the-huffington-post">Huffington Post</option>
            <option value="mashable">Mashable</option>
            <option value="metro">Metro</option>
            <option value="mirror">Mirror</option>
            <option value="national-geographic">National Geographic</option>
            <option value="newsweek">Newsweek</option>
            <option value="new-york-magazine">New York Mag</option>
            <option value="recode">Recode</option>
            <option value="reddit-r-all">Reddit</option>
            <option value="reuters">Reuters</option>
            <option value="techcrunch">Techcrunch</option>
            <option value="the-economist">The Economist</option>
            <option value="the-guardian-uk">The Guardian (UK)</option>
            <option value="the-telegraph">The Telegraph</option>
            <option value="the-wall-street-jounral">The Wall Street Journal</option>
            <option value="time">Time</option>
            <option value="usa-today">USA Today</option>
          </select>
          <br />
          <br />
          <button onClick={this.findArticles.bind(this)}>Latest Headlines!</button>
        </div>

        {/* RESULT SECTION */}
        <div className="article-results">
          {this.state.articles.map((article) => {
            return(
              <div key={article.title} className="article">
                <div>
                  <h3><a href={article.url}>{article.title}</a></h3>
                  <a href={article.url}><img src={article.urlToImage} height="200" /></a>
                  <p>{article.description}</p>
                  <p>{article.author}</p>
                  <p>{article.publishedAt}</p>
                  <button onClick={this.handleSubmit.bind(this)}>Save Article</button>
                </div>
              </div>
            );
          })}
        </div>
        {/* <p>Source: <a href="https://newsapi.org/">News API</a></p> */}
      </div>
    );
  }

}

export default Homepage;
