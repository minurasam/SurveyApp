import React, { useState } from 'react'
import { FormSignup } from './FormSignup'
import { FormSuccess } from './FormSuccess';
import './Form.css';

const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <>
        <div>
            <h1>Survey App</h1>
        </div>
        <div className='form-container'>
            <span className="close-btn">x</span>
            <div className='form-content-left'>
                <img src='/img/img-2.svg' alt='spaceship' className='form-img'/>
            </div>
            {!isSubmitted ? <FormSignup submitForm=
            {submitForm} /> : <FormSuccess />}
        </div>
        </>
    )
}

export default Form

