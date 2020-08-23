import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './styles.scss';
import { auth ,signInWithGoogle } from './../../firebase/utils';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors([]);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (email.length !== 0 && password.length !== 0) {
            try {
                await auth.signInWithEmailAndPassword(email, password);

                // reset form
                resetForm();
                props.history.push('/');

            } catch (err) {
                console.log(err);
                setErrors(['Email or password invalid']);
            }
        }
    }

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

            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />

                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
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

export default withRouter(SignIn);