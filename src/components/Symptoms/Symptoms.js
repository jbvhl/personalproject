import React, { Component } from "react";
import "./symptoms.css";
import axios from "axios";

class Symptoms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symptoms: []
    };
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  diagnose = async () => {
    let symptoms = {
      symptoms: this.state.symptoms
    };
    try {
      let res = await axios.post(`/api/diagnosis`, symptoms)
    } catch(err) {

    }
  };

  render() {
    const { symptom1, symptom2, symptom3, symptom4, symptom5 } = this.state;
    return (
      <div>
        <h2>Symptoms</h2>
        <p>For accuracy purposes, please enter at least 5 symptoms you are experiencing.</p>
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
          onChange={e => this.handleChange("symptom2", e.target.value)}
        />

        <input
          placeholder="Enter Symptom 3 Here"
          type="text"
          value={symptom3}
          onChange={e => this.handleChange("symptom3", e.target.value)}
        />

        <input
          placeholder="Enter Symptom 4 Here"
          type="text"
          value={symptom4}
          onChange={e => this.handleChange("symptom4", e.target.value)}
        />

        <input
          placeholder="Enter Symptom 5 Here"
          type="text"
          value={symptom5}
          onChange={e => this.handleChange("symptom5", e.target.value)}
        />

        <button onClick={this.diagnose}>Diagnose Me!</button>
      </div>
    );
  }
}

export default Symptoms;
