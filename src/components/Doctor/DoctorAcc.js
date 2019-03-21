import React, {Component} from 'react';
import axios from "axios";
import {updateDoctor} from '../../ducks/authReducer';
import { connect } from "react-redux";


class DoctorAcc extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
          password: "",
          confirmPassword: ""
        };

        this.deleteAcc = this.deleteAcc.bind(this);
      }

      handleChange(props, val) {
        this.setState({
          [props]: val
        });
      }

      update = async () => {
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
          let res = await axios.put(`/api/doctor/account`, doctor);
          this.props.updateDoctor(res.data);
          this.props.history.push("/doctor");
        } catch (err) {
          console.log(err)
          alert("Email already exists");
        }
      };

      async deleteAcc() {
        let res = await axios.delete("/api/doctor/account", this.props.dId);
        this.props.updateDoctor(res.data);
        this.props.history.push('/');
        }

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

        <button onClick={this.update}>Update</button>
        <button onClick={this.deleteAcc}>Delete Account</button>
            </div>
        )
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
    )(DoctorAcc);