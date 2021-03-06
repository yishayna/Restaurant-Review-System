import {AccountActionsConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import {fromJS, List} from 'immutable';
import AccountActions from './actions'


function* getMyReviews(action) {

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
    console.log("reviews length")
    console.log(json.reviews.length>0);

    json.reviews.length > 0 ? yield put(AccountActions.setAllReviews(json)): null;
  }
  catch (e) {null;
  }
}

function* getAllUsers(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log("all users json")
    console.log(json);
    yield put(AccountActions.setAllUsers(json))
  }
  catch (e) {
    yield put(AccountActions.setAllUsers(List()))
  }
}


function* updateUserName(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log("update profile response json")
    console.log(json);
    json.success ?  yield put(AccountActions.setComplete()) :
                    yield put(AccountActions.setError()) ;  
  }
  catch (e) {
    yield put(AccountActions.setError());
  }
}



function* updateLocation(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log("update location response json")
    console.log(json);
    json.success ?  yield put(AccountActions.setComplete()) :
                    yield put(AccountActions.setError()) ;  
  }
  catch (e) {
    yield put(AccountActions.setError());
  }
}



function* deleteReview(action) {
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log("update location response json")
    console.log(json);
    json.success ?  yield put(AccountActions.setDeleteSucccess()) :
                    yield put(AccountActions.setDeleteError()) ;  
  }
  catch (e) {
    yield put(AccountActions.setDeleteError());
  }
}




function* updateReview(action) {
  console.log( "in update review ")
  const state = yield select();
  const formData = new FormData();
  formData.append('bathroomQuality', state['Account'].get('bathroomQuality'));
  formData.append('staffKindness', state['Account'].get('staffKindness'));
  formData.append('cleanliness', state['Account'].get('cleanliness'));
  formData.append('driveThruQuality', state['Account'].get('driveThruQuality'));
  formData.append('deliverySpeed', state['Account'].get('deliverySpeed'));
  formData.append('foodQuality', state['Account'].get('foodQuality'));
  formData.append('reviewId',state['Account'].get('reviewId'));
  formData.append('picture', state['Account'].get('picture'));

  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData,

      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log(json);
    json.success ?  yield put(AccountActions.setUpdateCompleted()) :
                    yield put(AccountActions.setUpdateError());
  
  } catch (e) {
    yield put(AccountActions.setUpdateError());
     }
  }



function* AccountSaga() {
  yield takeEvery(AccountActionsConstants.GET_ALL_REVIEWS, getMyReviews);
  yield takeEvery(AccountActionsConstants.UPDATE_USERNAME, updateUserName);
  yield takeEvery(AccountActionsConstants.UPDATE_LOCATION, updateLocation);
  yield takeEvery(AccountActionsConstants.DELETE_REVIEW, deleteReview);
  yield takeEvery(AccountActionsConstants.UPDATE_REVIEW, updateReview);

}

export default AccountSaga;