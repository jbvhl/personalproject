import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './register.scss';


class Register extends Component {
    render() {
        return (
            <div>
                <h1>Register</h1>
                <Link to='/register/patientreg'>
                    <button>I am a Patient</button>
                </Link>

                <Link to='/register/doctorreg'>
                    <button>I am a Doctor</button>
                </Link>
            </div>
        )
    }
}

export default Register;