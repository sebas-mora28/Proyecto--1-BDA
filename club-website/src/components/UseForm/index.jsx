import { useState } from 'react'


/**
 * @description This function
 * @param {Object} initialValues values used in the form 
 * @returns {Object} 
 */
const useForm = (initialValues) => {


    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});


    /**
     * @description This function updates a value when is changed in the 
     * form.
     * @param {Event} e event when a value of a input if changed 
     */
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }


    /**
     * @description Reset all the fields of the form.
     */
    const resetForm = () => {
        setValues(initialValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}

/**
 * @description this component creates a new form 
 * @param {Object} props 
 * @returns 
 */
const Form = (props) => {

    const { children, ...other } = props;
    return (
        <form  autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

export {Form, useForm}
