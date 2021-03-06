import {AppActionsConstants} from './constants.js';

function setRequireAuth() {
  return {
    type: AppActionsConstants.SET_REQUIRE_AUTH,
  }
}

function setUserAuth(user) {
  return {
    type: AppActionsConstants.SET_USER_AUTH,
    payload: {
      user,
    }
  }
}

function loadUsernameAuth() {
  return {
    type: AppActionsConstants.LOAD_USERNAME_AUTH,
    uri: '/api/checkToken'
  }
}

function logout() {
  return {
    type: AppActionsConstants.LOGOUT,
    uri: '/api/logout'
  }
}

let AppActions = {
  setRequireAuth,
  setUserAuth,
  loadUsernameAuth,
  logout
};

export default AppActions;
