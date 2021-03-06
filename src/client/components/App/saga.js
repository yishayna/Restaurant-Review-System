import {AppActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import AppActions from './actions'

function* loadUsernameAuth(action) {
  console.log("loadUsernameAuth");
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    const json = yield call([res, 'json']); //retrieve body of response
    console.log("in app load Auth of user")
      console.log(json.user)
      json.user? yield put(AppActions.setUserAuth(json.user)):
                 yield put(AppActions.setRequireAuth());
  } catch (e) {
    yield put(AppActions.setRequireAuth());
  }
}

function* logout(action) {
  try {
    const res = yield call(fetch, action.uri,{
      method: 'POST',
      credentials: 'include',
      },
    );
    const json = yield call([res, 'json']); //retrieve body of response
    yield put(AppActions.setRequireAuth());
  } catch (e) {
    yield put(AppActions.setRequireAuth());
  }
}

function* AppSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(AppActionsConstants.LOAD_USERNAME_AUTH, loadUsernameAuth);
  yield takeEvery(AppActionsConstants.LOGOUT, logout);
}

export default AppSaga;
