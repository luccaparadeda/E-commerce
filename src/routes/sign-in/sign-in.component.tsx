import {signInWIthGooglePopup,
        createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import { SignUpForm } from '../../components/sign-up-form/sign-up-form.component';


export const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWIthGooglePopup();
        const additionalContent = {}
        await createUserDocumentFromAuth(user, additionalContent)
    }

    return(
        <div>
            <h1>Sign-in</h1>
            <button onClick={logGoogleUser}>
                Sign in with google
            </button>
            <SignUpForm></SignUpForm>
        </div>
    )
}