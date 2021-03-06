import {ProfilesActionsConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import {fromJS, List} from 'immutable';
import ProfilesActions from './actions'


function* getAllUsers(action) {
  console.log("in get all users saga")
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log("all prifiles json")
    console.log(json);
    yield put(ProfilesActions.setAllUsers(json))
  }
  catch (e) {
    yield put(ProfilesActions.setAllUsers(List()))
  }
}

function* ProfilesSaga() {
  yield takeEvery(ProfilesActionsConstants.GET_ALL_USERS, getAllUsers);
}

export default ProfilesSaga;