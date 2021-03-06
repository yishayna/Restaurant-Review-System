import React from 'react';
import { connect } from 'react-redux';
import Register from '../Register';
import App from '../App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";







class Menu extends React.Component {
    componentDidMount() {
    }

  render() {
       return (
        <div>
        <Router>
            <Switch>

            </Switch>
        </Router>
    </div>
      );
    }
  }
{/* <Router>
<Container className='content-container'>
<Switch>
  <Route path="/register/" component={Register}/>
</Switch>
</Container>
</Router> 


  <div className="app-root">
    <div className="app-header">      
        <h2>Restaurant Review</h2>
          <Button
          label="Register"
          className="p-button-raised p-button-rounded"
          onClick={this.onSubmit}

          />
          <div className="app-button1">
            <Button
            label="Login"
            className="p-button-raised p-button-rounded"
            onClick={() => this.props.loadImagesEventHandler(this.props.tag)}
            />
          </div>
    </div>
    <nav>
      <Link to="/">App</Link>
      <Link to="/register">Register</Link>
    </nav>
    <Route
        path="/"
        component={App}
        exact 
    />
    <Route
        path="/register"
        component={Register} 
    />
  </div>
*/}


const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
