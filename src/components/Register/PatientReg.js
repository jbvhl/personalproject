import React, { Component } from "react";
import axios from "axios";
import { updatePatient } from "../../ducks/authReducer";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import "./PatientReg.css";

class PatientReg extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      height: "",
      weight: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    
    this.register = this.register.bind(this);
  }

  handleChange(props, val) {
    this.setState({
      [props]: val
    });
  }

  async register() {
    if (this.state.password !== this.state.confirmPassword) {
      alert(`Passwords do not match`);
    }
    if (this.state.height.includes(`'`)) {
      this.state.height = this.state.height.split(`'`).join(".");
    }
    let patient = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight,
      email: this.state.email,
      password: this.state.password
    };
    try {
      console.log(patient);
      let res = await axios.post(`/auth/register`, patient);
      this.props.updatePatient(res.data);
      this.props.history.push("/patient");
    } catch (err) {
      alert("Email already exists");
    }
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
      password,
      confirmPassword
    } = this.state;
    return (
      <div>
        <Link to='/register/home'>
          <button>Go Back</button>
        </Link>
        <h1>Become a Patient!</h1>
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
          value={password}
          onChange={e => this.handleChange("password", e.target.value)}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => this.handleChange("confirmPassword", e.target.value)}
        />

        <button onClick={this.register}>Create Account</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
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
)(PatientReg);
