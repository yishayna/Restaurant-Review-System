import { all } from 'redux-saga/effects'
import AppSaga from './components/App/saga'
import SignUpSaga from './components/SignUp/saga'
import SignInSaga from './components/SignIn/saga'
import SearchBarSaga from './components/Utiles/demo/components/saga'
import RestaurantsSaga from './components/Restaurants/saga'
import AccountSaga from './components/Account/saga'
import ReviewsSaga from './components/Reviews/saga'
import ProfilesSaga from './components/Profiles/saga'



export default function* Sagas() {
    yield all([
        AppSaga(),
        SignUpSaga(),
        SignInSaga(),
        SearchBarSaga(),
        RestaurantsSaga(),
        AccountSaga(),
        ReviewsSaga(),
        ProfilesSaga(),

    ])
}
