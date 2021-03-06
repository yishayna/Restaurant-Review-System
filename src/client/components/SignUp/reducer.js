import initialState from '../../initialState';
import {SignUpActionsConstants} from './constants.js';
const {List} = require('immutable');

  
const SignUpReducer = (state = initialState.SignUp, action) => {
  switch (action.type) {
    case SignUpActionsConstants.CHANGE_VALUE:
      console.log(`SignUpReducer: " ${SignUpActionsConstants.CHANGE_VALUE} name: ${action.payload.name} value: ${action.payload.value}`);
      return state.set(action.payload.name, action.payload.value);
    case SignUpActionsConstants.SET_REGISTRATION_COMPLETE:
      return state.set('error', false).set('completed', true);
    case SignUpActionsConstants.SET_REGISTRATION_FAILED:
      return state.set('error', true);
    default:
      return state;
  }
};

export default SignUpReducer


