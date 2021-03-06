import initialState from '../../initialState';
import {ReviewsActionsConstants} from './constants.js';

const ReviewsReducer = (state = initialState.Reviews, action) => {
    console.log("enterd to ReviewsReducer"+action.type);
  switch (action.type) {
    case ReviewsActionsConstants.CHANGE_VALUE:
       return action.payload.name == "initForm"?
          state.set('bathroomQuality', 0)
          .set('cleanliness', 0)
          .set('driveThruQuality', 0)
          .set('staffKindness', 0)
          .set('deliverySpeed', 0)
          .set('foodQuality', 0)
          .set('picture', null)
          .set('error', false)
          .set('completed', false)
          :state.set(action.payload.name, action.payload.value);
    case ReviewsActionsConstants.SET_ALL_RESTAURANTS:
      return state.set('restaurants', action.payload.restaurants);    
    case ReviewsActionsConstants.SET_ALL_REVIEWS:
      console.log( "in set reviews" +action.payload.reviews)
      return state.set('reviews', action.payload.reviews).set('isReviews',true);
    case ReviewsActionsConstants.SET_NO_REVIEWS:
      return state.set('isReviews',false);      
    case ReviewsActionsConstants.SET_REVIEWS_ADVANCED_SEARCH_COMPLETE:
      console.log( "in set advanced search reducer reviews" )
      console.log(action.payload.reviews)
      return state.set('reviews', action.payload.reviews);   
    
    case ReviewsActionsConstants.SET_NEW_REVIEW_FAILED:
        return state.set('bathroomQuality', 0)
        .set('cleanliness', 0)
        .set('driveThruQuality', 0)
        .set('staffKindness', 0)
        .set('deliverySpeed', 0)
        .set('foodQuality', 0)
        .set('picture', null)
        .set('error', true)
        .set('completed', false);
    case ReviewsActionsConstants.SET_NEW_REVIEW_COMPLETE:
      return state.set('bathroomQuality', 0)
      .set('cleanliness', 0)
      .set('driveThruQuality', 0)
      .set('staffKindness', 0)
      .set('deliverySpeed', 0)
      .set('foodQuality', 0)
      .set('picture', null)
      .set('error', false)
      .set('completed', true);
    
    default: //otherwise state is lost!
      return state;
  }
};

export default ReviewsReducer
