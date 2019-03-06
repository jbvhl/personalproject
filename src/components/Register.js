import React, {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    handleChange(props, val) {
        this.setState({
            [props]: val
        });
    }

    render() {
        return (
            <div>
                Restiger Page
                
            </div>
        )
    }
}

export default Register;