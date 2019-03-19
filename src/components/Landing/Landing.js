import React, { Component } from "react";
import "./landing.scss";
import axios from "axios";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = async () => {
    await axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=health&apiKey=${
          process.env.REACT_APP_apiKey
        }`
      )
      .then(res => {
        this.setState({
          articles: res.data.articles
        });
      });
  };

  render() {
    const articles = this.state.articles
      .filter((article, i, arr) => {
        return arr.map(obj => obj.title).indexOf(article.title) === i;
      })
      .slice(0, 3)
      .map((article, i) => {
        return (
          <div className="article" key={i}>
          <div>
            <img src={article.urlToImage} />
            </div>
            <div className='articleInfo'>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url}>Read More.</a>
            </div>
          </div>
        );
      });

    return (
      <div>
        <h1 className="Title">Diagnosed</h1>
        <div>{articles}</div>
      </div>
    );
  }
}

export default Landing;
