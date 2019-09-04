
import { combineReducers } from 'redux'
import {SET_USER_PROFILES} from '../actions';

const initialState = { 
  profile: {
    name: null,
    uid: null,
    sex: null,
    height: null,
    age: null,
    updated_at: null,
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

export function post(state = {}, action) {
  switch (action.type) {
      case SET_USER_PROFILES:
        return action.post;
      /*case UPDATE_POST_SUCCESS:
        return action.post;*/
      default:
        return state;
  }
}

export default combineReducers({
  post
})
