import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updatePatient} from "../../ducks/authReducer";
import "./patient.css";
import Symptoms from "../Symptoms/Symptoms";

class Patient extends Component {
  componentDidMount() {
    this.getPatient();
  }

  getPatient = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get(`/api/patient`);
        this.props.updatePatient(res.data);
      } catch (err) {
        this.props.history.push("/");
      }
    }
  };

  render() {
    const { firstName, lastName } = this.props;
    // console.log(this.props);
    return (
      <div>
        <h1>
          What kind of symptoms are you feeling today, {firstName} {lastName}?
        </h1>
        <Symptoms />
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  updatePatient
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Patient);
