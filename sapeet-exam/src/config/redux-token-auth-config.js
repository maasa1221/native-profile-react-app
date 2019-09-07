import { generateAuthActions } from "redux-token-auth"
import Settings from "./application"

const config = {
  authUrl: "http://localhost:3001/auth",
  userAttributes: {
    email: 'email',
    password: 'password'
  },
  userRegistrationAttributes: {
    email: 'email',
    password: 'password'
  }
  
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

// see: https://devise-token-auth.gitbook.io/devise-token-auth/usage/controller_methods
// see: https://github.com/kylecorbelli/redux-token-auth/blob/master/src/services/auth.ts#L10-L16
const authHeaderKeys = ["access-token", "token-type", "client", "expiry", "uid"]

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
  authHeaderKeys,
}