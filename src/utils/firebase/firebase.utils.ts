import { initializeApp } from 'firebase/app'
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyD2tvIHER-Jls0RzimvrbQHJdk2M42O9KA",
    authDomain: "e-commerce-course-db.firebaseapp.com",
    projectId: "e-commerce-course-db",
    storageBucket: "e-commerce-course-db.appspot.com",
    messagingSenderId: "887730598364",
    appId: "1:887730598364:web:9a12df78f08ea11e625f19"
  };
  
export const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
 provider.setCustomParameters({
    prompt: "select_account"
 })

export const auth = getAuth()
export const signInWIthGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: { uid: string; displayName:string | null; email:string | null }) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error:any) {
      console.log('error creating user', error.message)
      }
  }
}