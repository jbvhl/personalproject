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

//   removeSymp = () => {
//     this.state.symptoms.map((symptom, i) => {
//       if (symptom.name === this.state.symptom) {
//         this.state.symptoms.splice(i, 1)
//         this.props.update(this.state.symptoms)
//       }
//   })

//     this.setState({
//       deleteToggle: true,
//       symptoms: this.state.symptoms
//   })
// }

  updateSymp = async () => {
    await axios
      .post(
        "https://api.infermedica.com/v2/parse",
        { symptom: this.state.symptom },
        this.config
      )
      .then(res => {
        console.log("womp", res);
      });
    this.setState({
      saveToggle: !this.state.saveToggle,
      editToggle: !this.state.editToggle
    });
  };

  render() {
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
            {this.state.deleteToggle ? (
              null
            ) : (
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
