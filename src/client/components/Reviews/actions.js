import {ReviewsActionsConstants} from './constants'

function changeValue(name, value) {
  return {
    type: ReviewsActionsConstants.CHANGE_VALUE,
    payload: {name, value}
  }
}

function getAllReviews() {
    return {
      type: ReviewsActionsConstants.GET_ALL_REVIEWS,
      uri: '/api/reviews'
  
    }
  }

  function getAllRestaurants() {
    return {
      type: ReviewsActionsConstants.GET_ALL_RESTAURANTS,
      uri: '/api/restaurants'
  
    }
  }

function setAllRestaurants(restaurants) {
    console.log("in funcion set restaurants"+ restaurants)
    return {
      type: ReviewsActionsConstants.SET_ALL_RESTAURANTS,
      payload: {restaurants}
    }
  }


function setAllReviews(reviews) {
    console.log("in funcion set reviews"+ reviews)
    return {
      type: ReviewsActionsConstants.SET_ALL_REVIEWS,
      payload: {reviews}
    }
  }

function setNoReviews() {
  return {
    type: ReviewsActionsConstants.SET_NO_REVIEWS,
  }
}


function addReview() {
  return {
    type: ReviewsActionsConstants.ADD_NEW_REVIEW,
    uri: '/api/restaurants/newreview'
  }
}
function SearchReviews(restaurantName) {
    return {
      type: ReviewsActionsConstants.SEARCH_REVIEWS,
      uri: `/api/restaurants/reviews?restaurantName=${restaurantName}`
    }
  }
function setNewReviewComplete() {
  return {
    type: ReviewsActionsConstants.SET_NEW_REVIEW_COMPLETE,
  }
}

function setNewReviewtFailed() {
  return {
    type: ReviewsActionsConstants.SET_NEW_REVIEW_FAILED,
  }
}
function sortReviews(value) {
  return {
    type: ReviewsActionsConstants.SORT_REVIEWS_BY_VALUE,
    uri: `/api/reviews/byvalue?value=${value}`
  }
}
function advancedSearch() {
  return {
    type: ReviewsActionsConstants.ADVANCED_SEARCH,
    uri: `/api/restaurants/search/advanced`
  }
}
function setReviewsAdvancedSearch(reviews) {
  return {
    type: ReviewsActionsConstants.SET_REVIEWS_ADVANCED_SEARCH_COMPLETE,
    payload: {reviews}
  }
}
const ReviewsActions = {
  changeValue,
  getAllReviews,
  setAllReviews,
  addReview,
  setNewReviewComplete,
  setNewReviewtFailed,
  setAllRestaurants,
  getAllRestaurants,
  SearchReviews,
  sortReviews,
  advancedSearch,
  setReviewsAdvancedSearch,
  setNoReviews,

};


export default ReviewsActions;