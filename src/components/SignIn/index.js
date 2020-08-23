import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import { auth ,signInWithGoogle } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';


const initialState = {
    email: '',
    password: '',
    errors: []
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;

        if (email.length !== 0 && password.length !== 0) {
            try {
                await auth.signInWithEmailAndPassword(email, password);
                this.setState({
                    ...initialState
                })


            } catch (err) {
                console.log(err);
                this.setState({
                    errors: ['Email or password invalid'],
                })
            }
        }
    }

    render() {
        const { email, password, errors } = this.state;
        const authWrapperConfig = {
            headline: 'Login',
            classes: 'signin'
        }

        return (
            <AuthWrapper {...authWrapperConfig}>

                {errors.length > 0 && (
                    <div className="formValidation">
                        <ul>
                            {errors.map( (err, index) => {
                                return <li key={index}>{err}</li>
                            } )}
                        </ul>
                    </div>
                )}

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                    />

                    <Button type="submit">
                        Login
                    </Button>

                    <div className="links">
                        <Link to="/recovery">Forgot password</Link>
                    </div>

                    <div className="socialSignin">
                        <Button onClick={signInWithGoogle}>
                            Sign in with Google
                        </Button>
                    </div>
                </form>
            </AuthWrapper>
        )
    }
}

export default SignIn;