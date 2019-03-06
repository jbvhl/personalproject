import React, { Component } from "react";
import "./symptoms.css";

class Symptoms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symptom1: "",
      symptom2: "",
      symptom3: "",
      symptom4: "",
      symptom5: ""
    };
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  //diagnose = async () => {};

  render() {
    const { symptom1, symptom2, symptom3, symptom4, symptom5 } = this.state;
    return (
      <div>
        <h2>Symptoms</h2>
        <input
          placeholder="Enter Symptom 1 Here"
          type="text"
          value={symptom1}
          onChange={e => this.handleChange("symptom1", e.target.value)}
        />

        <input
          placeholder="Enter Symptom 2 Here"
          type="text"
          value={symptom2}
          onChange={e => this.handleChange("", e.target.value)}
        />

        <input
          placeholder="Enter Symptom 3 Here"
          type="text"
          value={symptom3}
          onChange={e => this.handleChange("", e.target.value)}
        />

        <input
          placeholder="Enter Symptom 4 Here"
          type="text"
          value={symptom4}
          onChange={e => this.handleChange("", e.target.value)}
        />

        <input
          placeholder="Enter Symptom 5 Here"
          type="text"
          value={symptom5}
          onChange={e => this.handleChange("", e.target.value)}
        />

        <button onClick={this.diagnose}>Diagnose Me!</button>
      </div>
    );
  }
}

export default Symptoms;
