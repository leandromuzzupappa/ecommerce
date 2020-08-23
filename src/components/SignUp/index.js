import React, { Component } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from '../../firebase/utils';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';


const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
}


class SignUp extends Component {
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
        })
    }

    handleFormSubmit = async e => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        // Validate data
        if (password !== confirmPassword) {
            const err = ['Passwords does not match'];
            this.setState({
                errors: err,
            })
            return;
        }
        
        // The email address is badly formatted.

        if (password.length < 6) {
            const err = ['Password should be at least 6 characters'];
            this.setState({
                errors: err,
            })
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, {displayName});
            
            this.setState({
                ...initialState,
            });
        

        } catch (err) {
            console.log(err);
        }

    }


    render() {

        const { displayName, email, password, confirmPassword, errors } = this.state;
        const authWrapperConfig = {
            headline: 'Registration',
            classes: 'signup'
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

                <form onSubmit={this.handleFormSubmit}>

                    <FormInput
                        label="Full name"
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        onChange={this.handleChange}
                    />

                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                    />

                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                    />

                    <FormInput
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm password"
                        onChange={this.handleChange}
                    />

                    <Button type="submit">
                        Register
                    </Button>

                </form>
            </AuthWrapper>
        )
    }
}

export default SignUp;