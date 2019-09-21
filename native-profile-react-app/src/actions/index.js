import axios from 'axios';
import { registerUser } from '../config/redux-token-auth-config';
import  {RNS3} from 'react-native-aws3';


const options = {
  keyPrefix: "",
  bucket: "",
  region: "",
  accessKey: "",
  secretKey: "",
  successActionStatus: 201
}

export function mapStateToProps(state) {
  return state;
}
export function mapDispatchToProps(dispatch) {
  return{
    getProfile: () => {
        axios.get('http://localhost:3001/profiles')
        .then((response) => {
            dispatch({type:'SET_USER_PROFILES', profile: response.data})
        })
    },
    postProfile: (prof) => {
      axios.post('http://localhost:3001/profiles',prof)
      .then(() => {
          dispatch({type:'CREATE_USER_PROFILES'})
      })
    },
    postPhoto: (photo) => {
      RNS3.put(photo, options)
    },
    putProfile: (prof,id) => {
      axios.put('http://localhost:3001/profiles/'+ id,prof)
      .then((response) => {
          dispatch({type:'UPDATE_USER_PROFILES', profile: response.data})
          //console.log(response.data)
      })
    },
    registerSuccess: ({email,password}) => {
      registerUser({ email, password})
        .then(() => {
            dispatch({type:"REGISTER_SUCCESS"})
      })
    }
  }
}
