import React, { Component } from "react";
import axios from "axios";
import { updatePatient } from "../../ducks/reducer";
import { connect } from "react-redux";
import "./register.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.register = this.register.bind(this);
  }

  handleChange(props, val) {
    this.setState({
      [props]: val
    });
  }

  async register() {
    let patient = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    try {
      let res = await axios.post(`/auth/register`, patient);
      this.props.updatePatient(res.data);
      this.props.history.push("/patient");
    } catch (err) {
      alert("Email already exists");
    }
  }

  render() {
    const { firstName, lastName, email, password } = this.state;
    return (
      <div>
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

        <input
          placeholder="Email"
          value={email}
          onChange={e => this.handleChange("email", e.target.value)}
        />

        <input
          placeholder="Password"
          value={password}
          onChange={e => this.handleChange("password", e.target.value)}
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
    email: reduxState.email
  };
};

const mapDispathToProps = {
  updatePatient
};
export default connect(
  mapStateToProps,
  mapDispathToProps
)(Register);
