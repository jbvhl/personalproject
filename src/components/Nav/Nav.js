import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { updatePatient, clearPatient } from "../../ducks/authReducer";
import { connect } from "react-redux";
import "./nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  login = async () => {
    let patient = {
      email: this.state.email,
      password: this.state.password
    };
    try {
      let res = await axios.post(`/auth/login`, patient);
      console.log(res.data);
      this.props.updatePatient(res.data);
      this.props.history.push(`/patient`);
    } catch (err) {
      alert("Incorrect email/password");
    }
  };

  logout = async () => {
    await axios.post(`/auth/logout`);
    this.props.clearPatient();
    this.props.history.push("/");
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        {this.props.id ? (
          <div>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/patient">
              <button>My Profile</button>
            </Link>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : (
          <div>
            {" "}
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={e => this.handleChange("email", e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={e => this.handleChange("password", e.target.value)}
            />
            <button onClick={this.login}>Login</button>
            <Link to="/register">Register</Link>{" "}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.id
  };
};

const mapDispatchToProps = {
  updatePatient,
  clearPatient
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
