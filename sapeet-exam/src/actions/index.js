import axios from 'axios';
import { registerUser } from '../config/redux-token-auth-config';
import  {RNS3} from 'react-native-aws3';




export function mapStateToProps(state) {
  return state;
}

id=1

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
      const options = {
        keyPrefix: "uploads/",
        bucket: "sapeetapp",
        region: "ap-northeast-1",
        accessKey: "AKIAIZYFR6T5ZIXATAXQ",
        secretKey: "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",
        successActionStatus: 201
      }
      RNS3.put(photo, options)
      .then(response => {
        if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      });
    },
    putProfile: (prof) => {
      axios.put('http://localhost:3001/profiles/'+ id,prof)
      .then(() => {
          dispatch({type:'UPDATE_USER_PROFILES'})
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
