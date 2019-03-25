import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateDoctor, updatePatient } from "../../ducks/authReducer";
import "./doctor.scss";

class Doctor extends Component {
  constructor() {
    super();
    this.state = {
      patients: []
    };
  }

  componentDidMount() {
    this.getDoc();
    this.getPatients();
  }

  getPatients = async () => {
    const {dId} = this.props;
    console.log('asdf', dId)
    let res = await axios.get(`/api/patients`, {dId});
    console.log('patients', res.data)
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

  render() {
    console.log(this.props)
    const mappedPatients = this.state.patients.map(patient => {
      return (
        <div className='patient'>
        <h4>Name:</h4> {patient.firstName} {patient.lastName}
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
