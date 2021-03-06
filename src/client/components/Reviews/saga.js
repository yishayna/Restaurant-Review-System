import {ReviewsActionsConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import {fromJS, List} from 'immutable';
import ReviewsActions from './actions'

function* getReviews(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log("get normal reviews")
    console.log(json);
    console.log(json.reviews.length);

    json.reviews.length>0?  yield put(ReviewsActions.setAllReviews(json)):
                    yield put(ReviewsActions.setNoReviews());
  }
   catch (e) {
    yield put(ReviewsActions.setNoReviews());
  }
}

function* getRestaurants(action) {
    try {
      const res = yield call(fetch, action.uri,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
      const json = yield call([res, 'json']); //retrieve body of response
      console.log(json);
      yield put(ReviewsActions.setAllRestaurants(json));
    }
     catch (e) {
      yield put(ReviewsActions.setAllRestaurants(List()));
    }
  }
  
function* addReview(action) {
  console.log( "in add review ")

  const state = yield select();
  const formData = new FormData();
  formData.append('user', state['app'].get('username'));
  formData.append('bathroomQuality', state['Reviews'].get('bathroomQuality'));
  formData.append('staffKindness', state['Reviews'].get('staffKindness'));
  formData.append('cleanliness', state['Reviews'].get('cleanliness'));
  formData.append('driveThruQuality', state['Reviews'].get('driveThruQuality'));
  formData.append('deliverySpeed', state['Reviews'].get('deliverySpeed'));
  formData.append('foodQuality', state['Reviews'].get('foodQuality'));
  formData.append('restaurant',state['Reviews'].get('restaurant'));
  formData.append('picture', state['Reviews'].get('picture'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData,

      });
      console.log("formdata is ")
      for (var value of formData.values()) {
        console.log(value); 
     }
    const json = yield call([res, 'json']); //retrieve body of response
    console.log(json);
    json.success ?  yield put(ReviewsActions.setNewReviewComplete()) :
                    yield put(ReviewsActions.setNewReviewtFailed());
  
  } catch (e) {
    yield put(ReviewsActions.setNewReviewtFailed());
     }
  }


  function* SearchReviews(action) {
    console.log(`URI:   ${action.uri}`)
    try {
      const res = yield call(fetch, action.uri,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log(json)
        yield put(ReviewsActions.setAllReviews(json));
    }
     catch (e) {
      yield put(ReviewsActions.setAllReviews(List()));
    }
}



function* getReviewsByValue(action) {
  console.log(`URI:   ${action.uri}`)
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const json = yield call([res, 'json']); //retrieve body of response
      console.log(json)
      yield put(ReviewsActions.setAllReviews(json));
  }
   catch (e) {
    yield put(ReviewsActions.setAllReviews(List()));
  }
}

function* advancedSearch(action) {
  const state = yield select();
  const formData = new FormData();
  formData.append('userName', state['app'].get('username'));
  formData.append('nameSearch', state['Reviews'].get('nameSearch')); 
  formData.append('locationSearch', state['Reviews'].get('locationSearch')); 
  formData.append('averageSearch', state['Reviews'].get('averageSearch')); 
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData,

      });
      const json = yield call([res, 'json']); //retrieve body of response
      console.log("json")
      console.log(json)
    console.log({"reviews":json.reviews.map((element)=>element.reviews).flat()})
      yield put(ReviewsActions.setReviewsAdvancedSearch({"reviews":json.reviews.map((element)=>element.reviews).flat()}));
  }
   catch (e) {
    yield put(ReviewsActions.setReviewsAdvancedSearch(List()));
  }
}

function* ReviewsSaga() {
  yield takeEvery(ReviewsActionsConstants.GET_ALL_REVIEWS, getReviews);
  yield takeEvery(ReviewsActionsConstants.GET_ALL_RESTAURANTS, getRestaurants);
  yield takeEvery(ReviewsActionsConstants.ADD_NEW_REVIEW, addReview);
  yield takeEvery(ReviewsActionsConstants.SEARCH_REVIEWS, SearchReviews);
  yield takeEvery(ReviewsActionsConstants.SORT_REVIEWS_BY_VALUE, getReviewsByValue);
  yield takeEvery(ReviewsActionsConstants.ADVANCED_SEARCH, advancedSearch);
}

export default ReviewsSaga;