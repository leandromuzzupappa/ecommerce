import React, {Component} from 'react';

import './styles.scss';
import Buttons from '../forms/Button';
import {signInWithGoogle} from '../../firebase/utils'

class SignIn extends Component {

    handleSubmit = async e => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="signin">
                <div className="wrapper">
                    <h2>
                        LogIn
                    </h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="socialSignin">
                            <Buttons onClick={signInWithGoogle}>
                                Sign in with Google
                            </Buttons>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignIn;