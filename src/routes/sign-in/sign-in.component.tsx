import {signInWIthGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

export const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWIthGooglePopup();
        createUserDocumentFromAuth(user)
    }
    return(
        <div>
            <h1>Sign-in</h1>
            <button onClick={logGoogleUser}>
                Sign in with google
            </button>
        </div>
    )
}