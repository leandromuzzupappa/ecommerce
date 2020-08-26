import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    emailSignInStart,
    googleSignInStart,
} from '../../redux/User/user.actions';

import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
});

const SignIn = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { currentUser } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }
    }, [currentUser]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.lengh < 1 && password.length < 1) {
            return;
        }

        dispatch(emailSignInStart({ email, password }));
    };

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
    };

    const authWrapperConfig = {
        headline: 'Login',
        classes: 'signin',
    };

    return (
        <AuthWrapper {...authWrapperConfig}>
            {errors.length > 0 && (
                <div className="formValidation">
                    <ul>
                        {errors.map((err, index) => {
                            return <li key={index}>{err}</li>;
                        })}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit">Login</Button>

                <div className="links">
                    <Link to="/recovery">Forgot password</Link>
                </div>

                <div className="socialSignin">
                    <Button onClick={handleGoogleSignIn}>
                        Sign in with Google
                    </Button>
                </div>
            </form>
        </AuthWrapper>
    );
};

export default SignIn;
