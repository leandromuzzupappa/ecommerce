import React, {Component} from 'react';

import './styles.scss';
import Buttons from '../forms/Button';
import {auth ,signInWithGoogle} from '../../firebase/utils'
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

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
        const {name, value} = e.target;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();

        const {email, password} = this.state;

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
            return;
        }
    }

    render() {
        const {email, password, errors} = this.state;

        return (
            <div className="signin">
                <h2>
                    LogIn
                </h2>

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

                    <div className="socialSignin">
                        <Buttons onClick={signInWithGoogle}>
                            Sign in with Google
                        </Buttons>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;