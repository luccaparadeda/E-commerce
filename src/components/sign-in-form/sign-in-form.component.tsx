import React, { useState } from "react"
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { Button } from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email:'',
    password:'',
}

export const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }
    
    const signInWithGoogle = async() => {
        await signInWithGooglePopup();
      
    }


    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields()
        } catch (error:any) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found': 
                    alert('no user associated with this email')
                    break
                default: console.log(error)
            }
        }
    }
    return (
        <div className="sign-in-container">
            <h2>Already Have an account?</h2>
            <span>Sign in with your email and pasword</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</Button>
                </div>
            </form>
        </div>
    )
}