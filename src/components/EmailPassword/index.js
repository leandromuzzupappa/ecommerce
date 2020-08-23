import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'

import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from  './../forms/FormInput'
import Button from  './../forms/Button'
import { auth } from '../../firebase/utils';


const EmailPassword = props => {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        if (email.length !== 0) {
            try {
                const config = {
                    url: 'http://localhost:3000/login'
                }
                await auth.sendPasswordResetEmail(email, config)
                    .then(() => {
                        props.history.push('/login');
                    })
                    .catch(()=>{
                        const err = ['Email not found!']
                        setErrors(err);
                    })
    
            } catch (err) {
                console.log(err);
            }
        } else {
            const err = ['Email is must!']
            setErrors(err);
        }

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