import React, { Component } from "react";
import "./landing.css";
import axios from "axios";

class Landing extends Component {
  componentDidMount() {
    this.getArticles();
  }

  getArticles = async () => {
    await axios.get(`https://newsapi.org/v2/top-headlines?category=health&apiKey=${process.env.REACT_APP_apiKey}`).then(res => {
      return res.data
    })
  }



  render() {
    return (
      <div>
        <h1>Diagnosed</h1>
        <div>
          Articles
          {this.getArticles}
        </div>
      </div>
    );
  }
}

export default Landing;
