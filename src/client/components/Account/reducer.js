import initialState from '../../initialState';
import {AccountActionsConstants} from './constants.js';

const AccountReducer = (state = initialState.Account, action) => {
  switch (action.type) {
    case AccountActionsConstants.CHANGE_VALUE:
      console.log(`enterd to AccountReducer ${action.payload.name}  ${action.payload.value}`);
      return state.set(action.payload.name, action.payload.value);

    case AccountActionsConstants.SET_ALL_REVIEWS:
      console.log("set user reviews!!!")
      return state.set('reviews', action.payload.reviews).set('isReviews',true);

    case AccountActionsConstants.SET_ALL_USERS:
      console.log("set all other users ");
      return state.set('users', action.payload.users)
    case AccountActionsConstants.SET_DELETE_ERROR:
      console.log("set delete fail ");
      return state.set('updateCompleted', false).set('updateError',true).set('updatePage',true)
    case AccountActionsConstants.SET_DELETE_SUCCESS:
      console.log("set delete success") ;
      return state.set('updateCompleted', true).set('updatePage',true)
  
    case AccountActionsConstants.SET_UPDATE_ERROR:
      console.log("set update fail ");
      return state.set('updateCompleted', false).set('updateError',true).set('updatePage',true);
    case AccountActionsConstants.SET_UPDATE_COMPLETED:
      console.log("set update success") ;
      return state.set('updateCompleted', true).set('updatePage',true)
    case AccountActionsConstants.SET_EDIT_REVIEW:
        return state.set('update', true).set('reviewId',action.payload.id);
    case AccountActionsConstants.SET_ERROR:
        return state.set('error', true);
    case AccountActionsConstants.SET_COMPLETE:
      console.log("set complete accoutn")
      return state.set('error', false).set('completed', true)
    default: //otherwise state is lost!
      return state;
  }
};

export default AccountReducer
