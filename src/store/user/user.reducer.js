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