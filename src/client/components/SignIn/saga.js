import {SignInActionsConstants} from './constants'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import SignInActions from './actions'

function* SignInUser(action) {
    console.log("Entered SignInUser SAGA")

    const state = yield select();
    try {
      const res = yield call(fetch, action.uri,
        {
          method: 'POST',
          body: JSON.stringify(state['SignIn'].toJS()),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        const json = yield call([res, 'json']); //retrieve body of response
        json.success ?  yield put(SignInActions.setComplete()) :
                        yield put(SignInActions.setFailed())   ;
      
    } catch (e) {
      yield put(SignInActions.setFailed());
    }
  }

function* SignInSaga() {
    yield takeEvery(SignInActionsConstants.SIGNIN_USER, SignInUser);
    
}

export default SignInSaga;
