import {RestaurantsActionsConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import {fromJS, List} from 'immutable';
import RestaurantsActions from './actions'

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
    yield put(RestaurantsActions.setAllRestaurants(json));
  }
   catch (e) {
    yield put(RestaurantsActions.setAllRestaurants(List()));
  }
}

function* addRestaurant(action) {
  console.log( "in add restaurant ")
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    const json = yield call([res, 'json']); //retrieve body of response
    json.success ?  yield put(RestaurantsActions.setNewRestaurantComplete()) :
                    yield put(RestaurantsActions.setNewRestaurantFailed());
  
  } catch (e) {
    yield put(RestaurantsActions.setNewRestaurantFailed());
     }
  }


function* getRankDistanceRestaurants(action) {
  const state = yield select();
  const formData = new FormData();
  formData.append('userName', state['app'].get('username'));
  formData.append('averageRank', state['Restaurants'].get('averageRank')); 
  formData.append('radiusFromMe', state['Restaurants'].get('radiusFromMe')); 
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log("restaurants distance rank");
    console.log(json);

    yield put(RestaurantsActions.setRankandDistanceRestaurants(json));
  }
   catch (e) {
    yield put(RestaurantsActions.setRankandDistanceRestaurants(List()));
  }
}

function* RestaurantsSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(RestaurantsActionsConstants.GET_ALL_RESTAURANTS, getRestaurants);
  yield takeEvery(RestaurantsActionsConstants.ADD_NEW_RESTAURANT, addRestaurant);
  yield takeEvery(RestaurantsActionsConstants.GET_RANK_DISTANCE_RESTAURANTS,getRankDistanceRestaurants);
}

export default RestaurantsSaga;