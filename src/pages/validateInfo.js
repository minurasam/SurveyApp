export default function validateInfo(values) {
    let errors = {}

    if(!values.username.trim()) 
    {
        errors.username = "Username required";
    }
    //Email
    if (!values.email) 
    {
        errors.email = "Email required";
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) 
    {
        errors.email = "Email address is invalid"; 
    }
    if (!values.password)
    {
        errors.password = 'Password is Required';
    } 
    else if (values.password.length < 8) 
    {
        errors.password = 'Password needs to be of 8 characters or more';
    }
    if (!values.password2) 
    {
        errors.password2 = 'Password confirmation is required';
    }
    else if (values.password2 !== values.password) 
    {
        errors.password2 = 'Passwords do not match';
    }

    return errors;
}