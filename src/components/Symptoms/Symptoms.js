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
      conditions: [],
      toggle: false,
      diagnoseToggle: false
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
  };

  getConditions = async () => {
    let res = await axios.get(
      "https://api.infermedica.com/v2/conditions",
      this.config
    );
    this.props.updateConditions(res.data);
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
    // console.log("symptoms si werkin", symptoms);
    try {
      let res = await axios.post(
        "https://api.infermedica.com/v2/parse",
        symptoms,
        this.config
      );
      this.props.updateSymptoms(res.data.mentions);
      // console.log("meeeeeerp", res.data.mentions);
      this.setState({
        toggle: true,
        symptoms: res.data.mentions
      });
    } catch (err) {
      console.log(err);
    }
  };

  diagnoseMe = async () => {
    let diagnose = {
      sex: this.props.gender,
      age: this.props.age,
      evidence: []
    };
    diagnose.evidence = this.state.symptoms.map(symptom => {
      return {
        id: symptom.id,
        choice_id: symptom.choice_id
      };
    });
    let res = await axios.post(
      "https://api.infermedica.com/v2/diagnosis",
      diagnose,
      this.config
    );
    this.props.updateConditions(res.data.conditions);
    this.setState({
      diagnoseToggle: true,
      conditions: res.data.conditions
    });
  };

  render() {
    return (
      <div>
        {this.state.diagnoseToggle ? (
          <div>
            <h2>Possible Conditions</h2>
            {this.state.conditions.map(condition => {
              return <h3>{condition.common_name}</h3>;
            })}
          </div>
        ) : (
          <div>
            <h2>Symptoms</h2>
            {this.state.toggle ? (
              <div>
                <h3>Are these your symptoms?</h3>
                {this.state.symptoms.map((symptom, i) => {
                  return (
                    <Symptom
                      symptomObj={symptom}
                      symptom={symptom.name}
                      id={symptom.id}
                      choiceID={symptom.choice_id}
                      key={i}
                      handleChange={this.handleChange}
                      config={this.config}
                      symptoms={this.props.symptoms}
                      update={this.props.updateSymptoms}
                    />
                  );
                })}
                <button onClick={this.diagnoseMe}>Yes, diagnose me.</button>
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
