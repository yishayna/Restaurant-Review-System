import initialState from '../../initialState';
import {AppActionsConstants} from './constants.js';

const AppReducer = (state = initialState.app, action) => {
  switch (action.type) {
    case AppActionsConstants.SET_REQUIRE_AUTH:
      return state.set('requireAuth', true).set('username', '').set('loading', false);
    case AppActionsConstants.SET_USER_AUTH: 
      console.log("the user in app is  ")
      console.log(action.payload.user)
      return state.set('requireAuth', false).set('user', action.payload.user).set('loading', false).set('username',action.payload.user.username);
    default: //otherwise state is lost!
      return state;
  }
};

export default AppReducer
