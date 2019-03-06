import React, {Component} from 'react';

class Header extends Component {

    render() {
        return (
            <div>
               <input 
               type='text'
               placeholder='email'
               />

                <input 
               type='password'
               placeholder='password'
               />
            </div>
        );
    }
}

export default Header;