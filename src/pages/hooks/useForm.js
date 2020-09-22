import { useState, useEffect } from 'react'

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = e => {
        const { names, value } = e.target;
        setValues({
            ...values,
            [names]:value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting) 
        {
            callback();
        }
    },
    [errors]
    );

    return { handleChange, values, handleSubmit, errors };
};

export default useForm;