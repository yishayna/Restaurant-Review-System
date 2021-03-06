import {AccountActionsConstants} from './constants'

function changeValue(name, value) {
  return {
    type: AccountActionsConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function getAllReviews(username) {
    return {
      type: AccountActionsConstants.GET_ALL_REVIEWS,
      uri: `/api/reviews?username=${username}`
  
    }
  }
  function setAllReviews(reviews) {
    console.log("in funcion set reviews"+ reviews)
    return {
      type: AccountActionsConstants.SET_ALL_REVIEWS,
      payload: {reviews}
    }
  }


function setError() {
  console.log("in funcion set error of user")
  return {
    type: AccountActionsConstants.SET_ERROR,

  }
}

function updateUserName(curruserName,newuserName) {
  console.log("in funcion update username"+ newuserName+"   ");
  return {
    type: AccountActionsConstants.UPDATE_USERNAME,
    uri: `/api/user/editusername?curruserName=${curruserName}&newuserName=${newuserName}`
  }
}

function updateLocation(curruserName,newlocation,newlat,newlng) {
  console.log("in funcion update location"+ newlocation+"   ");
  return {
    type: AccountActionsConstants.UPDATE_LOCATION,
    uri: `/api/user/editlocation?curruserName=${curruserName}&newlocation=${newlocation}&lat=${newlat}&lng=${newlng}`
  }
}
function deleteReview(id) {
  console.log("in funcion delete  review  ");
  console.log(id)
  return {
    type: AccountActionsConstants.DELETE_REVIEW,
    uri: `/api/review/delete?id=${id}`
  }
}

function updateReview() {
  console.log("in funcion update  review  ");
  return {
    type: AccountActionsConstants.UPDATE_REVIEW,
    uri: '/api/review/update'
  }
}

function setComplete() {
  console.log("in funcion set Complete  ");
  return {
    type: AccountActionsConstants.SET_COMPLETE,
  }
}
function setDeleteSucccess() {
  console.log("in funcion set Complete  ");
  return {
    type: AccountActionsConstants.SET_DELETE_SUCCESS,
  }
}function setDeleteError() {
  console.log("in funcion set Complete  ");
  return {
    type: AccountActionsConstants.SET_DELETE_ERROR,
  }
}
function setUpdateError() {
  console.log("in funcion set Complete  ");
  return {
    type: AccountActionsConstants.SET_UPDATE_ERROR,
  }
}
function setUpdateCompleted() {
  console.log("in funcion set Complete  ");
  return {
    type: AccountActionsConstants.SET_UPDATE_COMPLETED,
  }
}

function setEditReview(id) {
  console.log("in funcion set edit review  ");
  return {
    type: AccountActionsConstants.SET_EDIT_REVIEW,
    payload:{id}
  }
}

const AccountActions = {
  changeValue,
  getAllReviews,
  setAllReviews,
  updateLocation,
  updateUserName,
  setError,
  setComplete,
  deleteReview,
  setDeleteError,
  setDeleteSucccess,
  updateReview,
  setUpdateCompleted,
  setUpdateError,
  setEditReview,


};


export default AccountActions;