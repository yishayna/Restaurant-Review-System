import {SignInActionsConstants} from './constants'


function changeValue(name, value) {
    return {
      type: SignInActionsConstants.CHANGE_VALUE,
      payload: {name, value}
    }
  }
  
  function SignInUser() {
      console.log("enterd SignInUser action");
    return {
      type: SignInActionsConstants.SIGNIN_USER,
      uri: '/api/signin'
    }
  }
  
  function setComplete() {
    return {
      type: SignInActionsConstants.SET_COMPLETE,
    }
  }
  
  function setFailed() {
    return {
      type: SignInActionsConstants.SET_ERROR,
    }
  }
  
  const SignInActions = {
    changeValue,
    SignInUser,
    setComplete,
    setFailed,
  };


export default SignInActions
