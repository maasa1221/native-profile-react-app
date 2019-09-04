
import { combineReducers } from 'redux'
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

/*const reducer = handleActions({
  [actions.setUserUid]: (state, action) => ({
    ...state,
    uid: action.payload,
  }),
  [actions.setUserProperties]: (state, action) => ({
    ...state,
    properties: action.payload,
  })
}, initialState)*/

export default function reducer(state = initialState, action) {
  switch (action.type) {
      case 'SET_USER_PROFILES':
          //console.log(action.profile)
        return {profile: action.profile}
      /*case UPDATE_POST_SUCCESS:
        return action.post;*/
      default:
        return state;
  }
}

