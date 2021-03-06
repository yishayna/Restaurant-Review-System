import React from 'react';
import './App.scss';
import { connect } from 'react-redux';
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import AppActions from './actions';
import authentication from './authentication'
import {CardActions,Button,FormControlLabel,Avatar,Link,Grid,Box,CssBaseline,TextField,Checkbox,Typography} from '@material-ui/core';
import SignUp from '../SignUp/SignUp';
import Account from '../Account/Account';
import SignIn from '../SignIn/SignIn';
import Profiles from '../Profiles/Profiles';

import { Restaurant } from '@material-ui/icons';
import Restaurants from '../Restaurants/Restaurants'
import Reviews from '../Reviews/Reviews';

class App extends React.Component {
  componentDidMount() {
    this.props.loadUsername();
  }


  onClick = event => {
    event.preventDefault();
    console.log('The Button was clicked.');
    this.props.logout();
  }

  render() {
    const {requireAuth} = this.props;
       return (
        <BrowserRouter>
          {requireAuth? null: 
            <CardActions>
              <Button href="account" variant="text">Profile</Button>
              <Button href="restaurants"variant="text">Restaurants</Button>
              <Button href="reviews" variant="text">Reviews</Button>
              <Button href="profiles" variant="text">Profiles</Button>
              <Button type="submit" href="signin" variant="text" onClick={this.onClick}>Sign Out</Button>
        </CardActions>}
          <Switch>
                <Route path="/" exact={true} component={authentication(Account)} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <Route path="/account" component={authentication(Account)} />
                <Route path="/restaurants" component={authentication(Restaurants)} />
                <Route path="/reviews" component={authentication(Reviews)} />
                <Route path="/profiles" component={authentication(Profiles)} />

            </Switch>
        </BrowserRouter>
      );
    }
  }


const mapStateToProps = (state) => {
  return {
    user: state['app'].get('user'),
    requireAuth: state['app'].get('requireAuth')

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsername: () => dispatch(AppActions.loadUsernameAuth()),
    logout: () => dispatch(AppActions.logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
