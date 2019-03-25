import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateDoctor, updatePatient } from "../../ducks/authReducer";
import "./doctor.scss";
import {Pie} from 'chart.js'
// import io from 'socket.io-client';

class Doctor extends Component {
  constructor() {
    super();
    this.state = {
      patients: []
      // messages: [],
      // message: ''
    };
  }

  componentDidMount() {
    this.getDoc();
    this.getPatients();
    // this.chatListener();
  }

  getPatients = async () => {
    let res = await axios.get(`/api/patients`);
    // console.log(res.data)
    this.setState({
      patients: res.data
    });
  }

  getDoc = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get(`/api/doctor`);
        this.props.updateDoctor(res.data);
      } catch (err) {
        this.props.history.push("/");
      }
    }
  };

  // chatListener = async () => {
  //   this.socket=io();
  // }

  // chatRoom(doctor, patient) {
  //   this.socket.emit('endChat', this.state.c)
  // } 



  render() {
    const mappedPatients = this.state.patients.map(patient => {
      return (
        <div className='patient'>
        <h4>Name:</h4> {patient.first_name} {patient.last_name}
        <h4>Age:</h4> {patient.age}
        <h4>Gender:</h4> {patient.gender}
        </div>
      )
    });

    const { dLastName } = this.props;
    return (
      <div>
        <h1>Hello, Dr. {dLastName}</h1>
        <h3>Here are your patients.</h3>
        {mappedPatients}

      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  reduxState = reduxState.authReducer;
  return reduxState;
};

const mapDispatchToProps = {
  updateDoctor,
  updatePatient
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Doctor);
