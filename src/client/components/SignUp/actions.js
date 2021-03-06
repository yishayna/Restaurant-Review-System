import {SignUpActionsConstants} from './constants'

function changeValue(name, value) {
  return {
    type: SignUpActionsConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

//
function checkUserExists(username) {
  return {
    type: SignUpActionsConstants.CHECK_USER_EXISTS,
    uri: `/api/userexists?username=${username}`
  }
}


function setUsernameFree() {
  return {
    type: SignUpActionsConstants.SET_USER_FREE
  }
}

function registerUser() {
  return {
    type: SignUpActionsConstants.REGISTER_USER,
    uri: '/api/signup'
  }
}

function setRegistrationComplete() {
  return {
    type: SignUpActionsConstants.SET_REGISTRATION_COMPLETE,
  }
}

function setRegistrationFailed() {
  return {
    type: SignUpActionsConstants.SET_REGISTRATION_FAILED,
  }
}

const SignUpActions = {
  changeValue,
  checkUserExists,
  setUsernameFree,
  setRegistrationComplete,
  setRegistrationFailed,
  registerUser
};


export default SignUpActions;