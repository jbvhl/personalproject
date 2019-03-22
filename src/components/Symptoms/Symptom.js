import React, { Component } from "react";
import axios from "axios";

class Symptom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editToggle: false,
      deleteToggle: false,
      saveToggle: false,
      symptom: this.props.symptom,
      sympObj: this.props.symptomObj,
      symptoms: this.props.symptoms
    };
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    });
  };

  handleEditToggle() {
    this.setState({
      editToggle: !this.state.editToggle
    });
  }

  removeSymp = () => {
    this.state.symptoms.map((symptom, i) => {
      if (symptom.name === this.state.symptom) {
        this.state.symptoms.splice(i, 1);
        this.props.update(this.state.symptoms);
      }
    });
    // console.log("removed", this.state.symptoms);
    this.setState({
      deleteToggle: true,
      symptoms: this.state.symptoms
    });
  };

  updateSymp = async () => {
    let res = await axios.post(
      "https://api.infermedica.com/v2/parse",
      { text: this.state.symptom },
      this.props.config
    );
    for(let i = this.state.symptoms.length -1; i>-1; i--){
      if(this.state.symptoms[i].name === this.props.symptom){
        this.state.symptoms.splice(i, 1)
        this.state.symptoms.push(res.data.mentions[0])
      }
    }
    this.props.update(this.state.symptoms);
    this.setState({
      saveToggle: !this.state.saveToggle,
      editToggle: !this.state.editToggle,
      symptoms: this.state.symptoms,
      sympObj: res.data.mentions[0]
    });
  };

  render() {
    // console.log("sadfasdf", this.state.symptom, this.state.sympObj);
    // console.log("sympssss", this.state.symptoms);
    return (
      <div>
        {this.state.editToggle ? (
          <div>
            <input
              type="text"
              value={this.state.symptom}
              onChange={e => this.handleChange("symptom", e.target.value)}
            />
            <button onClick={this.updateSymp}>Save</button>
          </div>
        ) : (
          <div>
            {this.state.deleteToggle ? null : (
              <div>
                <ul>{this.state.symptom}</ul>
                <button onClick={this.handleEditToggle}>Edit</button>
                <button onClick={this.removeSymp}>Remove</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Symptom;
