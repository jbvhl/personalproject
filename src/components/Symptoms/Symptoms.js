import React, { Component } from "react";
import "./symptoms.scss";
import axios from "axios";
import { updateSymptoms } from "../../ducks/symptomsReducer";
import { connect } from "react-redux";
import Symptom from "./Symptom";

class Symptoms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
      symptoms: "",
      toggle: false
    };

    this.config = {
      headers: {
          "Content-Type": 'application/json',
          "App-ID": process.env.REACT_APP_API_ID,
          'App-Key': process.env.REACT_APP_API_KEYS
      }
  };
  }

  componentDidMount() {
    this.getSymp();
  }

  getSymp = async () => {
    let res = await axios.get('https://api.infermedica.com/v2/symptoms', this.config);
    this.props.updateSymptoms(res.data);
  };

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    });
  };

  symptoms = async () => {
    let symptoms = {
      sex: this.props.gender,
      age: this.props.age,
      text: this.state.symptoms
    };
    console.log('symptoms si werkin', symptoms)
    try {
      let res = await axios.post('https://api.infermedica.com/v2/parse', symptoms, this.config);
      this.props.updateSymptoms(res.data);
      console.log('meeeeeerp', res.data)
    } catch (err) {
      console.log(err);
    }
    this.setState({
      toggle: true
    });
  };

  // diagnoseMe = async () => {

  // }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Symptoms</h2>
        {this.state.toggle ? (
          <div>
            <h3>Are these your symptoms?</h3>
            {this.props.symptoms.map((symptom, i) => {
              return (
                <Symptom
                  symptom={symptom.name}
                  id={symptom.id}
                  key={i}
                  handleChange={this.handleChange}
                />
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

            <input
              placeholder="Details about symptoms"
              value={this.state.symptoms}
              onChange={e => this.handleChange("symptoms", e.target.value)}
            />

            <button onClick={this.symptoms}>Next</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  reduxState = Object.assign({}, reduxState.symptomsReducer, reduxState.authReducer);
  return {
    symptoms: reduxState.symptoms,
    gender: reduxState.gender,
    age: reduxState.age
  };
};

const mapDispatchToProps = {
  updateSymptoms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Symptoms);
