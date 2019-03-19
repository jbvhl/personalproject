import React, { Component } from "react";
import axios from "axios";

class Symptom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editToggle: false,
      edit: "",
      deleteToggle: false
    };
    this.handleEditToggle = this.handleEditToggle.bind(this);
  }

  handleEditToggle() {
    this.setState({
      editToggle: true
    });
  }

  handleDeleteToggle() {
    this.setState({
      deleteToggle: true
    });
  }

  deleteSymp = () => {
    const { symptom } = this.props;
    console.log("this is id", symptom);
    axios.delete(`/api/symptoms/${symptom}`).then(res => {
      console.log("adsf", res);
    });
  };

  saveSymp = () => {};

  render() {
    return (
      <div>
        <ul>{this.props.symptom}</ul>
        {this.state.editToggle ? (
          <div>
            <input
              type="text"
              value={this.props.symptom}
              onChange={e => this.props.handleChange(e.target.value)}
            />
            <button>Save</button>
          </div>
        ) : (
          <div>
            {this.state.deleteToggle ? <p>Deleted</p> : (
              <div>
                <button onClick={this.handleEditToggle}>Edit</button>
                <button onClick={this.deleteSymp}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Symptom;
