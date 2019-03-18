import React, { Component } from "react";
import "./landing.css";
import axios from "axios";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = async () => {
    await axios.get(`https://newsapi.org/v2/top-headlines?category=health&apiKey=${process.env.REACT_APP_apiKey}`).then(res => {
      this.setState({
        articles: res.data.articles
      });
    })
  }



  render() {
    const articles = this.state.articles.slice(0, 3).map((article, i) => {
        return (
          <div key={i}>
            <img src={article.urlToImage}/>
            <h3>
              {article.title}
            </h3>
            <p>{article.description}</p>
          </div>
        )
    })

    return (
      <div>
        <h1>Diagnosed</h1>
        <div>
          Articles
          {articles}
        </div>
      </div>
    );
  }
}

export default Landing;
