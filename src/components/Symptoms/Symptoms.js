import React, { Component } from "react";
import "./symptoms.css";
import axios from "axios";
import { updateSymptoms } from "../../ducks/symptomsReducer";
import { connect } from "react-redux";

class Symptoms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
      symptoms: "",
      toggle: false,
      editToggle: false
    };
  }

  componentDidMount() {
    this.getSymp();
  }

  getSymp = async () => {
    let res = await axios.get("/api/symptoms");
    this.props.updateSymptoms(res.data);
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleEditToggle(prop, val) {
    this.setState({
      [prop]: val,
      editToggle: true
    });
  }

  diagnose = async () => {
    const { location, symptoms } = this.state;
    let diagnose = {
      location,
      seperateSymp: []
    };
    if (symptoms) {
      diagnose.seperateSymp = symptoms.split(",");
    }
    try {
      let res = await axios.post("/api/symptoms", diagnose);
      this.props.updateSymptoms(res.data);
    } catch (err) {
      console.log(err);
    }
    this.setState({
      toggle: true
    });
  };

  render() {
    return (
      <div>
        <h2>Symptoms</h2>
        {this.state.toggle ? (
          <div>
            <h3>Are these your symptoms?</h3>
            {this.props.symptoms.map(symptom => {
              return (
                <div>
                  <ul>{symptom}</ul>
                  <button
                    value={this.state.symptom}
                    onClick={e =>
                      this.handleEditToggle("symptom", e.target.value)
                    }
                  >
                    edit
                  </button>
                </div>
              );
            })}
            <button>Yes, diagnose me.</button>
          </div>
        ) : (
          <div>
            <select
              onChange={e => this.handleChange("location", e.target.value)}
            >
              <option>Where does it hurt?</option>
              <option value="head">Head</option>
              <option value="chest">Chest</option>
              <option value="arms">Arms</option>
              <option value="hands">Hands</option>
              <option value="stomach">Stomach</option>
              <option value="legs">Legs</option>
              <option value="feet">Feet</option>
              <option value="spine">Spine</option>
              <option value="back">Back</option>
              <option value="other">Other</option>
            </select>

            <p>Please list specific symptoms you're experiencing.</p>
            <p>(Seperate symptoms by using a comma)</p>

            <input
              placeholder="Details about symptoms"
              value={this.state.symptoms}
              onChange={e => this.handleChange("symptoms", e.target.value)}
            />

            <button onClick={this.diagnose}>Next</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  reduxState = reduxState.symptomsReducer;
  return {
    symptoms: reduxState.symptoms
  };
};

const mapDispatchToProps = {
  updateSymptoms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Symptoms);
