import axios from 'axios'

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
    putProfile: (prof) => {
      axios.put('http://localhost:3001/profiles/'+ id,prof)
      .then(() => {
          dispatch({type:'UPDATE_USER_PROFILES'})
      })
    }
  }
}
