import { initializeApp } from 'firebase/app'
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
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

const googleProvider = new GoogleAuthProvider();
 googleProvider.setCustomParameters({
    prompt: "select_account"
 })

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey:any, objectsToAdd:any) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object:any) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()

  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((docSnapshot:any) => docSnapshot.data())
}

export const createUserDocumentFromAuth = async (userAuth: { uid: string; displayName:string | null; email:string | null }, additionalInformation:Object) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error:any) {
      console.log('error creating user', error.message)
      }
  }
}

export const createAuthUserWithEmailAndPassword = async(email: string, password: string) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async(email: string, password: string) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async() => await signOut(auth)

export const onAuthStateChangedListener = (callback:any) => 
onAuthStateChanged(auth, callback)