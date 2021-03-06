import initialState from '../../initialState';
import {SignInActionsConstants} from './constants.js';
const {List} = require('immutable');


const SignInReducer = (state = initialState.SignIn, action) => {

  switch (action.type) {
    case SignInActionsConstants.CHANGE_VALUE:
      console.log(`SignInReducer: " ${SignInActionsConstants.CHANGE_VALUE} name: ${action.payload.name} value: ${action.payload.value}`);
      return state.set(action.payload.name, action.payload.value);
    case SignInActionsConstants.SET_COMPLETE:
      return state.set('error', false).set('completed', true);
    case SignInActionsConstants.SET_ERROR:
      return state.set('error', true);
    default: 
      return state;
  }
};

export default SignInReducer
