import React, { Component } from "react";
import "./landing.scss";
import axios from "axios";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      illnesses: []
      // search: ''
    };

  }

  componentDidMount = async () => {
    await this.getArticles();
    await this.getIllnesses();
  }

  getArticles() {
    axios
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

  getIllnesses()  {
     axios
      .get(
        `https://mobilesvc.sickweather.com/ws/v2.0/illnesses/getIllnesses.php?api_key=fnw86kvhyt4yfgj4hmjxtqbk5anczmne`
      )
      .then(res => {
        // console.log('illnesses', res.data)
        this.setState({
          illnesses: res.data
        });
      });
  };

  // search() {
  //   axios.get(`https://mobilesvc.sickweather.com/ws/v2.0/illnesses/getIllnesses.php?api_key=fnw86kvhyt4yfgj4hmjxtqbk5anczmne`).then(res => {
  //     if (res.data.name == this.state.search) {
  //       this.setState({
  //         illnesses: res.data
  //       });
  //     }
  //   })
  // }

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
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
              <img src={article.urlToImage} alt="img" />
            </div>
            <div className="articleInfo">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url}>Read More.</a>
            </div>
          </div>
        );
      });

    const illnesses = this.state.illnesses.slice(0, 5).map((illness, i) => {
      return (
        <div className="illness" key={i}>
          <h3>{illness.name}</h3>
          <p>{illness.description}</p>
          <p>{illness.definition}</p>
        </div>
      );
    });

    return (
      <div>
        <h1 className="title">Diagnosed</h1>
        {/* <input placeholder='Search'
        value={this.state.search}
        onChange={e => this.handleChange('search', e.target.value)}/>
        <button onClick={this.search}>Search</button> */}
      <div className='landing'>
        <div className='info'>
          <div className="articles">{articles}</div>
          <div className="illnesses">{illnesses}</div>
        </div>
      </div>
      </div>
    );
  }
}

export default Landing;
