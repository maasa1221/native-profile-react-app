
import { combineReducers } from 'redux'
import { reduxTokenAuthReducer as reduxTokenAuth } from "redux-token-auth"
//import {SET_USER_PROFILES} from '../actions';

const initialState = { 
  profile: {
    name: "マサル",
    /*uid: null,
    sex: null,
    height: null,
    age: null,
    updated_at: null,*/
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
      case 'SET_USER_PROFILES':
        return {profile: action.profile}

      case 'CREATE_USER_PROFILES':
          return {profile: action.profile}
          
      case 'UPDATE_USER_PROFILES':
        console.log(state.profile[action.profile.id-1])
        state.profile[action.profile.id-1]=action.profile
        console.log(state.profile[action.profile.id-1])
        console.log(state.profile)
        return  {profile: state.profile}
      
      case "LOGIN_UPDATE_PARAMS":
        return 

      case "LOGIN_SUCCESS":
          return 
          
      case "LOGIN_FAILURE":
        return 

      case "REGISTER_UPDATE_PARAMS":
          return 
    
      case "REGISTER_SUCCESS":
          return 
              
      case "REGISTER_FAILURE":
        return 
      
      default:
        return state;
  }
}




 