import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  updatePatient,
  clearPatient,
  updateDoctor,
  clearDoctor
} from "../../ducks/authReducer";
import { connect } from "react-redux";
import "./nav.scss";

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
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    try {
      let res = await axios.post(`/auth/login`, user);
      // console.log(res.data);
      if (res.data.patient) {
        this.props.updatePatient(res.data);
        this.props.history.push("/patient");
      } else {
        this.props.updateDoctor(res.data.doctor);
        // console.log('meep', res.data);
        this.props.history.push("/doctor");
      }
    } catch (err) {
      console.log(err);
      alert("Wrong email/password.");
    }
    this.setState({
      email: "",
      password: ""
    });
  };

  logout = async () => {
    await axios.post(`/auth/logout`);
    this.props.clearPatient();
    this.props.clearDoctor();
    this.props.history.push("/");
  };

  render() {
    const { email, password } = this.state;
    if (
      this.props.location.pathname !== "/" &&
      !this.props.id &&
      !this.props.dId
    ) {
      return null;
    }
    // console.log('merpin', this.props.id, this.props.dId)

    return (
      <div>
        {this.props.id || this.props.dId ? (
          <div>
            <Link to="/">
              <button>Home</button>
            </Link>

            {this.props.dId ? (
              <div>
                <Link to="/doctor">
                  <button>My Profile</button>
                </Link>
                <Link to="/doctor/account">
                  <button>My Account</button>
                </Link>{" "}
              </div>
            ) : (
              <div>
                <Link to="/patient">
                  <button>My Profile</button>
                </Link>
                {/* <Link to="/patient/account">
                  <button>My Account</button>
                </Link> */}
              </div>
            )}

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
            <Link to="/register/home">Register</Link>{" "}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  reduxState = reduxState.authReducer;
  return {
    id: reduxState.id,
    dId: reduxState.dId
  };
};

const mapDispatchToProps = {
  updatePatient,
  clearPatient,
  updateDoctor,
  clearDoctor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
