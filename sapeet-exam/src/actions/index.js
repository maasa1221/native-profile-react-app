import axios from 'axios'
/*
export const SET_USER_PROFILES = 'SET_USER_PROFILES'

const setUserProfiles = posts => ({
  type: SET_USER_PROFILES,
  posts
})

export const getPost = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/profiles')
      .then((response) => {
        dispatch(setUserProfiles(response.data))
      })
      .catch((data) =>{
        console.log(data)
      })
  }axios.get('http://localhost:3001/profiles')
    .then((results) => {
      console.log(results)
      this.setState({profile: results.data})
    })
    .catch((data) =>{
      console.log(data)
    })
}
/*const actions = editActions(
  {
    SET_USER_PROFILES: (args) => (args),
  }
)*/
export function mapStateToProps(state) {
  return state;
}

export function mapDispatchToProps(dispatch) {
  return{
    getProfile: () => {
      return axios.get('http://localhost:3001/profiles')
        .then((response) => {
          dispatch({type:SET_USER_PROFILES, profile: results.data})
        })
    }
  }
}
