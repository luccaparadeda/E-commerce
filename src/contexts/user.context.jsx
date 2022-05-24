import { createContext, useEffect, useReducer, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: (user) => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER' : 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  console.log(' DISPATCH')
  console.log(action)

  const {type, payload} = action

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER :
      return{
        ...state,
        currentUser: payload
      }

    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE)

  console.log(currentUser)

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocumentFromAuth(user)
        }
        setCurrentUser(user)
    });
    
    return unsubscribe
  }, [])

  const value = {
    currentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};