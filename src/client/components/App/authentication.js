import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import AppActions from "./actions";
import SignIn from '../SignIn/SignIn';



const mapDispatchToProps = (dispatch) => {
  return {
    setRequireAuth: () => dispatch(AppActions.setRequireAuth()),
    loadUsernameAuth: () => dispatch(AppActions.loadUsernameAuth())
  }
};

export default function withAuth(ComponentToProtect) {
  class WithAuth extends Component {
   

    componentDidMount() {
      //this.props.loadUsernameAuth();
    }

    render() {
      const {loading, requireAuth} = this.props;
      return loading? null :
              requireAuth? <SignIn/> :
              <ComponentToProtect/>
      ;
    }
  }

  const mapStateToProps = (state) => {
    return {
      username: state['app'].get('username'),
      loading: state['app'].get('loading'),
      requireAuth: state['app'].get('requireAuth')
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
}
