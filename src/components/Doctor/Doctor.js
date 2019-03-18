import React, {Component} from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { updateDoctor} from "../../ducks/authReducer";

class Doctor extends Component {
    componentDidMount() {
        this.getDoc();
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
        const {dLastName } = this.props;
        return (
            <div>
                <h1>
                    Hello, Dr. {dLastName}
                </h1>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    reduxState = reduxState.authReducer;
    return reduxState;
  };
  
  const mapDispatchToProps = {
    updateDoctor
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Doctor);
  