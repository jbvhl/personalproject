import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import Nav from "./components/Nav/Nav";
import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav history={this.props.history} />
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
