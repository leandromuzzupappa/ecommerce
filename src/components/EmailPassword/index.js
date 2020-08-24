import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom'

import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from  './../forms/FormInput'
import Button from  './../forms/Button'
import { resetPassword, resetAllAuthForms } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const EmailPassword = props => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        if(resetPasswordSuccess) {
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }

    }, [resetPasswordSuccess])

    useEffect(()=>{
        // checeko si es un array y si tiene datos
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError);
            alert(1);
        }

    }, [resetPasswordError])

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({ email }));

    }


    const AuthWrapperConfig = {
        headline: 'Email Password',
        classes: 'recoverPassword'
    }

    return (
        <AuthWrapper {...AuthWrapperConfig}>

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
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={e => setEmail(e.target.value)}
                />

                <Button type="submit">
                    Email Password
                </Button>
            </form>

        </AuthWrapper>
    )
}

export default withRouter(EmailPassword);