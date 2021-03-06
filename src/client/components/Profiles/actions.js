import {ProfilesActionsConstants} from './constants'

function changeValue(name, value) {
  return {
    type: ProfilesActionsConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}


  function getAllUsers() {
    console.log("in funcion  get all users")
    return {
      type: ProfilesActionsConstants.GET_ALL_USERS,
      uri: `/api/users`
    }
  }

function setAllUsers(users) {
  console.log("in funcion set all users")
  return {
    type: ProfilesActionsConstants.SET_ALL_USERS,
    payload: {users}
  }
}

function setError() {
  console.log("in funcion set error of user")
  return {
    type: ProfilesActionsConstants.SET_ERROR,
  }
}


function setComplete() {
  console.log("in funcion set Complete  ");
  return {
    type: ProfilesActionsConstants.SET_COMPLETE,
  }
}



const ProfilesActions = {
  changeValue,
  getAllUsers,
  setAllUsers,
  setError,
  setComplete,

};


export default ProfilesActions;