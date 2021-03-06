import initialState from '../../initialState';
import {ProfilesActionsConstants} from './constants.js';

const ProfilesReducer = (state = initialState.Account, action) => {
  switch (action.type) {
    case ProfilesActionsConstants.CHANGE_VALUE:
      console.log(`enterd to profileReducer ${action.payload.name}  ${action.payload.value}`);
      return state.set(action.payload.name, action.payload.value);

    case ProfilesActionsConstants.SET_ALL_USERS:
      console.log("set all other users ");
      console.log( action.payload.users)
      return state.set('users', action.payload.users);
    

    case ProfilesActionsConstants.SET_ERROR:
        return state.set('error', true);
    case ProfilesActionsConstants.SET_COMPLETE:
      console.log("set complete accoutn")
      return state.set('error', false).set('completed', true);
    default: //otherwise state is lost!
      return state;
  }
};

export default ProfilesReducer
