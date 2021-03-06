import initialState from '../../initialState';
import {RestaurantsActionsConstants} from './constants.js';

const RestaurantsReducer = (state = initialState.Restaurants, action) => {
    console.log("enterd to RestaurantsReducer"+action.type);
  switch (action.type) {
    case RestaurantsActionsConstants.CHANGE_VALUE:
      console.log("var "+action.payload.name +"changed to "+action.payload.value)
      return state.set(action.payload.name, action.payload.value);


    case RestaurantsActionsConstants.SET_ALL_RESTAURANTS:
      console.log( "in set restaurants" +action.payload.restaurants)
      return state.set('restaurants', action.payload.restaurants);   
      
      
    case RestaurantsActionsConstants.SET_RANK_DISTANCE_RESTAURANTS:
      console.log( "in set distance rank restaurants" +action.payload.restaurants.restaurants)
      return state.set('restaurantDistance', action.payload.restaurants.restaurants); 


    case RestaurantsActionsConstants.SET_NEW_RESTAURANT_FAILED:
      return state.set('error', true);
    case RestaurantsActionsConstants.SET_NEW_RESTAURANT_COMPLETE:
      return state.set('error', false).set('completed', true);
    default: //otherwise state is lost!
      return state;
  }
};

export default RestaurantsReducer
