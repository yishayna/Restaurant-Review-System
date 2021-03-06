import {SignUpActionsConstants} from './constants'
import {call, put, takeEvery, select} from 'redux-saga/effects'
import SignUpActions from './actions'

function* userExists(action) {
  console.log(`URI:   ${action.uri}`)
    try {
      const res = yield call(fetch, action.uri,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
      const json =  yield call([res, 'json']); //retrieve body of response
      yield put(SignUpActions.changeValue("usernameExist",json.exists)) ;
      }
    catch (e) {
      yield put(SignUpActions.changeValue("usernameExist",true)) ;
    }
  }
  
function* registerUser(action) {
  const state = yield select();
  const formData = new FormData();
  formData.append('firstName', state['SignUp'].get('firstName'));
  formData.append('lastName', state['SignUp'].get('lastName'));
  formData.append('username', state['SignUp'].get('username'));
  formData.append('password', state['SignUp'].get('password'));
  formData.append('location', state['SignUp'].get('location'));
  formData.append('lat', state['SignUp'].get('lat'));
  formData.append('lng', state['SignUp'].get('lng'));
  formData.append('picture', state['SignUp'].get('picture'));
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        body: formData
      });

    const json = yield call([res, 'json']); //retrieve body of response
    json.success ?  yield put(SignUpActions.setRegistrationComplete()) :
                    yield put(SignUpActions.setRegistrationFailed());
  
  } catch (e) {
    yield put(SignUpActions.setRegistrationFailed());
     }
  }

function* SignUpSaga() {
    yield takeEvery(SignUpActionsConstants.CHECK_USER_EXISTS, userExists);
    yield takeEvery(SignUpActionsConstants.REGISTER_USER, registerUser);
}

export default SignUpSaga;



