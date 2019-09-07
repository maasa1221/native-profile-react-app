
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
export default function reducer(state = initialState, action) {
  switch (action.type) {
      case 'SET_USER_PROFILES':
        return {profile: action.profile}

      case 'CREATE_USER_PROFILES':
          return 
          
      case 'UPDATE_USER_PROFILES':
        return 

      default:
        return state;
  }
}

combineReducers({
  reducer,
  reduxTokenAuth,
 })