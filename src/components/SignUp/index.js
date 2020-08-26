import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUserStart } from './../../redux/User/user.actions';

import './styles.scss';

import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr,
});

const SignUp = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { currentUser, userErr } = useSelector(mapState);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        dispatch(
            signUpUserStart({
                displayName,
                email,
                password,
                confirmPassword,
            })
        );
    };

    const authWrapperConfig = {
        headline: 'Registration',
        classes: 'signup',
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

            <form onSubmit={handleFormSubmit}>
                <FormInput
                    label="Full name"
                    type="text"
                    name="displayName"
                    value={displayName}
                    placeholder="Full name"
                    handleChange={(e) => setDisplayName(e.target.value)}
                />

                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={(e) => setEmail(e.target.value)}
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    handleChange={(e) => setPassword(e.target.value)}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm password"
                    handleChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button type="submit">Register</Button>
            </form>
        </AuthWrapper>
    );
};

export default SignUp;
