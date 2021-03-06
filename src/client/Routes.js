
import Register from './components/SignUp/SignUp';
import login from './components/SignIn/SignIn'
import { Route, Router, BrowserRouter } from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-dom';

class ReactRouter extends React.Component {
    render () {
        return(
            <div>

            </div>
            
        );    
    }
}

const mapStateToProps = (state) => {
    return {
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(ReactRouter);
