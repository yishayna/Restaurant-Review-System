import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';
import SignUpReducer from './components/SignUp/reducer';
import SignInReducer from './components/SignIn/reducer';
import SearchBarReducer from './components/Utiles/demo/components/reducer'
import RestaurantsReducer from './components/Restaurants/reducer';
import AccountReducer from './components/Account/reducer';
import ReviewsReducer from './components/Reviews/reducer';
import ProfilesReducer from './components/Profiles/reducer';


export default combineReducers({
  app: AppReducer,
  SignUp: SignUpReducer,
  SignIn: SignInReducer,
  SearchBar: SearchBarReducer,
  Restaurants: RestaurantsReducer,
  Account: AccountReducer,
  Reviews: ReviewsReducer,
  Profiles:ProfilesReducer,

});
