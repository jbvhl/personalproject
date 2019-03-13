import React, { Component } from "react";
import "./symptoms.css";
import axios from "axios";

class Symptoms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      severity: '',
      start: '',
      occurance: '',
      symptoms: ''
    };
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  // diagnose = async () => {
  //   let seperateSymp = [];

  //   if (this.state.symptoms) {
  //     seperateSymp = this.state.symptoms.split(',').push(this.state.symptoms)
  //   }
  //   console.log('meeep', seperateSymp);
  // }

  render() {
    return (
      <div>
        <h2>Symptoms</h2>
        
        <select onChange={(e) => this.handleChange('location', e.target.value)}>
          <option>Where does it hurt?</option>
          <option value='head'>Head</option>
          <option value='chest'>Chest</option>
          <option value='arms'>Arms</option>
          <option value='legs'>Legs</option>
          <option value='stomach'>Stomach</option>
          <option value='spine'>Spine</option>
          <option value='back'>Back</option>
          <option value='other'>Other</option>
        </select>

        <select onChange={(e) => this.handleChange('severity', e.target.value)}>
          <option>How severe is your pain?</option>
          <option value='mild'>Mild</option>
          <option value='moderate'>Moderate</option>
          <option value='severe'>Severe</option>
        </select>

        <select onChange={(e) => this.handleChange('start', e.target.value)}>
          <option>When did it start?</option>
          <option value='recently'>Recently (within a week)</option>
          <option value='weeks'>A Week(s)</option>
          <option value='months'>A Month(s)</option>
        </select>

        <select onChange={(e) => this.handleChange('occurance', e.target.value)}>
          <option>How often does it occur?</option>
          <option value='one time'>One Time</option>
          <option value='sometimes'>Sometimes</option>
          <option value='frequently'>Frequently</option>
        </select>

        <p>Please list specific symptoms you're experiencing.</p>

        <input 
        placeholder='Details about symptoms'
        value={this.state.symptoms}
        onChange={e => this.handleChange('symptoms', e.target.value)}/>

        <button onClick={this.diagnose}>Diagnose Me!</button>
      </div>
    );
  }
}

export default Symptoms;
