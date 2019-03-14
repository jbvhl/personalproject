import React, { Component } from "react";
import axios from "axios";
import {updateDoctor} from '../../ducks/authReducer';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './DoctorReg.css';

class DoctorReg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleChange(props, val) {
    this.setState({
      [props]: val
    });
  }

  register = async () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert(`Passwords do not match`);
    }

    let doctor = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    try {
      let res = await axios.post(`/auth/register/doctor`, doctor);
      this.props.updateDoctor(res.data);
      this.props.history.push("/doctor");
    } catch (err) {
      console.log(err)
      alert("Email already exists");
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state;
    return (
      <div>
        <Link to="/register/home">
          <button>Go Back</button>
        </Link>
        <h1>Doctor Register.</h1>
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
  reduxState = reduxState.authReducer
    return {
        dId: reduxState.dID,
        dFirstName: reduxState.dFirstName,
        dLastName: reduxState.dLastName,
        dEmail: reduxState.dEmail
    }
}

const mapDispathToProps = {
    updateDoctor
  };

  export default connect(
    mapStateToProps,
    mapDispathToProps
  )(DoctorReg);
