import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { Button } from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";
import {SignUpContainer} from './sign-up-form.styles.jsx'

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}

export const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
       if(password !== confirmPassword) {
           alert('passwords do not match')
           return;
       }
       try {
        const {user} = await createAuthUserWithEmailAndPassword(email, password);

        await createUserDocumentFromAuth(user, {displayName})
        
        resetFormFields()
       } catch(error) {
           if(error.code === 'auth/email-already-in-use') {
               alert('Cannot create user, email already in use');
           } else {
            console.log(`user creation encounter a ${error}`)
           }
       }
      
    }
    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and pasword</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display name"
                    type='text' 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName} 
                    required
                />
                <FormInput 
                    label="Email"
                    type='email' 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                    required
                    />
                <FormInput 
                    label="Password"
                    type='password' 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                    required
                />
                <FormInput 
                    label="Confirm Password"
                    type='password' 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword}
                    required
                />
                <Button type="submit">Sign up</Button>
            </form>
        </SignUpContainer>
    )
}