import React, { Component } from "react";
import "./symptoms.css";
import axios from "axios";

class Symptoms extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    return (
      <div>
        <h2>Symptoms</h2>
        
        <select>
          <option value='location'>Where does it hurt?</option>
          <option value='location'>Head</option>
          <option value='location'>Chest</option>
          <option value='location'>Arms</option>
          <option value='location'>Legs</option>
          <option value='location'>Stomach</option>
          <option value='location'>Spine</option>
          <option value='location'>Back</option>
        </select>

        

        <button onClick={this.diagnose}>Diagnose Me!</button>
      </div>
    );
  }
}

export default Symptoms;
