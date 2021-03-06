import {RestaurantsActionsConstants} from './constants'

function changeValue(name, value) {
  return {
    type: RestaurantsActionsConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function getAllRestaurants() {
    return {
      type: RestaurantsActionsConstants.GET_ALL_RESTAURANTS,
      uri: '/api/restaurants'
  
    }
  }

function setAllRestaurants(restaurants) {
    console.log("in funcion set restaurants"+ restaurants)
    return {
      type: RestaurantsActionsConstants.SET_ALL_RESTAURANTS,
      payload: {restaurants}
    }
  }

  
function newRestaurant(name,location,lat,lng) {
  return {
    type: RestaurantsActionsConstants.ADD_NEW_RESTAURANT,
    uri: `/api/restaurants/add?name=${name}&location=${location}&lat=${lat}&lng=${lng}`

  }
}
function setNewRestaurantComplete() {
  return {
    type: RestaurantsActionsConstants.SET_NEW_RESTAURANT_COMPLETE,
  }
}


function setRankandDistanceRestaurants(restaurants) {
  return {
    type: RestaurantsActionsConstants.SET_RANK_DISTANCE_RESTAURANTS,
    payload: {restaurants}

  }
}
function setNewRestaurantFailed() {
  return {
    type: RestaurantsActionsConstants.SET_NEW_RESTAURANT_FAILED,
  }
}
function getRankandDistanceRestaurants() {
  return {
    type: RestaurantsActionsConstants.GET_RANK_DISTANCE_RESTAURANTS,
    uri: `/api/restaurants/search/bydistance`
  }
}

const RestaurantsActions = {
  changeValue,
  getAllRestaurants,
  setAllRestaurants,
  newRestaurant,
  setNewRestaurantComplete,
  setNewRestaurantFailed,
  getRankandDistanceRestaurants,
  setRankandDistanceRestaurants,


};


export default RestaurantsActions;