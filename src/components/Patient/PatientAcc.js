import React, { Component } from "react";
import axios from "axios";
import { updatePatient } from "../../ducks/authReducer";
import { connect } from "react-redux";

class PatientAcc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      gender: this.props.gender,
      age: this.props.age,
      height: this.props.height,
      weight: this.props.weight,
      email: this.props.email,
      password: "",
      confirmPassword: ""
    };

    this.update = this.update.bind(this);
    this.deleteAcc = this.deleteAcc.bind(this);
  }

  handleChange(props, val) {
    this.setState({
      [props]: val
    });
  }

  async update() {
    let {
      firstName,
      lastName,
      gender,
      age,
      height,
      weight,
      email,
      password,
      confirmPassword
    } = this.state;

    if (password !== confirmPassword) {
      alert(`Passwords do not match`);
    }

    if (height.includes(`'`)) {
      height = height.split(`'`).join(".");
    }

    


    let patient = {
      id: this.props.id,
      firstName,
      lastName,
      gender,
      age,
      height,
      weight,
      email,
      password
    };

    // console.log('meeeeeeeeepin', patient);
    try {
      let res = await axios.put(`/api/patient/account`, patient);
      this.props.updatePatient(res.data);
      this.props.history.push("/patient");
    } catch (err) {
      console.log(err);
      alert("Email already exists");
    }
  }

  async deleteAcc() {
    let res = await axios.delete("/api/patient/account", this.props.id);
    this.props.updatePatient(res.data);
    this.props.history.push('/');
    }

  render() {
    const {
      firstName,
      lastName,
      gender,
      age,
      height,
      weight,
      email,
      confirmPassword
    } = this.state;
    return (
      <div>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={e => this.handleChange("firstName", e.target.value)}
        />

        <input
          placeholder="Last Name"
          value={lastName}
          onChange={e => this.handleChange("lastName", e.target.value)}
        />

        <select
          value={gender}
          onChange={e => this.handleChange("gender", e.target.value)}
        >
          <option value="gender">gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="n/a">N/A</option>
        </select>

        <input
          placeholder="Age "
          value={age}
          onChange={e => this.handleChange("age", e.target.value)}
        />

        <input
          placeholder="Height"
          value={height}
          onChange={e => this.handleChange("height", e.target.value)}
        />

        <input
          placeholder="Weight"
          value={weight}
          onChange={e => this.handleChange("weight", e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => this.handleChange("email", e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={this.props.password}
          onChange={e => this.handleChange("password", e.target.value)}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => this.handleChange("confirmPassword", e.target.value)}
        />

        <button onClick={this.update}>Update</button>
        <button onClick={this.deleteAcc}>Delete Account</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  reduxState = reduxState.authReducer;
  return {
    id: reduxState.id,
    firstName: reduxState.firstName,
    lastName: reduxState.lastName,
    gender: reduxState.gender,
    age: reduxState.age,
    height: reduxState.height,
    weight: reduxState.weight,
    email: reduxState.email
  };
};

const mapDispathToProps = {
  updatePatient
};
export default connect(
  mapStateToProps,
  mapDispathToProps
)(PatientAcc);
