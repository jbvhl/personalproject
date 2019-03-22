import React, { Component } from "react";
import "./symptoms.scss";
import axios from "axios";
import { updateSymptoms, updateConditions } from "../../ducks/symptomsReducer";
import { connect } from "react-redux";
import Symptom from "./Symptom";

class Symptoms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symptoms: "",
      toggle: false
    };

    this.config = {
      headers: {
        "Content-Type": "application/json",
        "App-ID": process.env.REACT_APP_API_ID,
        "App-Key": process.env.REACT_APP_API_KEYS
      }
    };
  }

  componentDidMount() {
    this.getSymp();
    this.getConditions();
  }

  getSymp = async () => {
    let res = await axios.get(
      "https://api.infermedica.com/v2/symptoms",
      this.config
    );
    this.props.updateSymptoms(res.data);
    console.log('gettin symptommmms', res.data)
  };
  
  getConditions = async () => {
    let res = await axios.get(
      "https://api.infermedica.com/v2/conditions",
      this.config
    );
    this.props.updateConditions(res.data);
    console.log('gettin conditionss', res.data)
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
    console.log("symptoms si werkin", symptoms);
    try {
      let res = await axios.post(
        "https://api.infermedica.com/v2/parse",
        symptoms,
        this.config
      );
      this.props.updateSymptoms(res.data);
      console.log("meeeeeerp", res.data);
    } catch (err) {
      console.log(err);
    }
    this.setState({
      toggle: true
    });
  };

  // diagnoseMe = async () => {
  //   let diagnose = {
  //     sex: this.props.gender,
  //     age: this.props.age,
  //     evidence: [{
  //       id: this.props.symptom.id,
  //       choice_id: this.props.symptom.choice_id
  //     }]
  //   };
  //   let res = await axios.post('https://api.infermedica.com/v2/diagnosis', diagnose, this.config);
  //   this.updateConditions
  // }

  render() {
    // console.log('beep boop', this.props);
    return (
      <div>
        <h2>Symptoms</h2>
        {this.state.toggle ? (
          <div>
            <h3>Are these your symptoms?</h3>
            {this.props.symptoms.mentions.map((symptom, i) => {
              return (
                <Symptom
                  symptom={symptom.name}
                  id={symptom.id}
                  choiceID={symptom.choice_id}
                  key={i}
                  handleChange={this.handleChange}
                  config={this.config}
                  symptoms={this.props.symptoms.mentions}
                  update={this.props.updateSymptoms}
                />
              );
            })}
            <button>Yes, diagnose me.</button>
          </div>
        ) : (
          <div>
            <p>Please list symptoms you're experiencing.</p>

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
  reduxState = Object.assign(
    {},
    reduxState.symptomsReducer,
    reduxState.authReducer
  );
  return {
    symptoms: reduxState.symptoms,
    conditions: reduxState.conditions,
    gender: reduxState.gender,
    age: reduxState.age
  };
};

const mapDispatchToProps = {
  updateSymptoms,
  updateConditions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Symptoms);
