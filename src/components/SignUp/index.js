import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './styles.scss';

import { auth, handleUserProfile } from '../../firebase/utils';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';


const SignUp = props => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = async e => {
        e.preventDefault();

        // Validate data
        if (password !== confirmPassword) {
            const err = ['Passwords does not match'];
            setErrors(err);
            return;
        }
        
        // The email address is badly formatted.

        if (password.length < 6) {
            const err = ['Password should be at least 6 characters'];
            setErrors(err);
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, {displayName});
            
            // reset form
            resetForm();
            props.history.push('/');
        

        } catch (err) {
            console.log(err);
        }

    }

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

            <form onSubmit={handleFormSubmit}>

                <FormInput
                    label="Full name"
                    type="text"
                    name="displayName"
                    value={displayName}
                    placeholder="Full name"
                    handleChange={e => setDisplayName(e.target.value)}
                />

                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={e => setEmail(e.target.value)}
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    handleChange={e => setPassword(e.target.value)}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm password"
                    handleChange={e => setConfirmPassword(e.target.value)}
                />

                <Button type="submit">
                    Register
                </Button>

            </form>
        </AuthWrapper>
    )
}

export default withRouter(SignUp);