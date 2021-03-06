import React from 'react';
import './SignUp.scss';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import  '@material-ui/icons';
import 'typeface-roboto';
import {Button,FormControl,Avatar,Link,Grid,Box} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import {useStyles} from './index';
import Typography from '@material-ui/core/Typography';
import {DropzoneArea} from '../Dropzone';
import {Form, Card, Row, Col} from 'react-bootstrap';
import {withStyles} from '@material-ui/core/styles';
import SignUpActions from "./actions";
 

class SignUp extends React.Component {
  
 
  handlePlaceSelect() {
    var place = this.autocomplete.getPlace();
    this.props.onChangeValue('location',place.formatted_address)
    this.props.onChangeValue('lat', place.geometry.location.lat());
    this.props.onChangeValue('lng', place.geometry.location.lng());
  }

 

componentDidMount() {
  this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {});
  this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  this.autocomplete.addListener("place_changed", this.handlePlaceSelect)

}

handleChange(files){
  this.props.onChangeValue('picture',files)};

onChange =  event => {
  console.log(event.target.id);
    switch (event.target.id){
      case "username":
        this.props.checkIsUsernameFree(event.target.value);
      default:
        this.props.onChangeValue(event.target.name, event.target.value)
    }
}

onClick = event => {
    event.preventDefault();
    console.log('The Button was clicked.');
    this.props.registerUser();
}

handleSelect = selected => {
  this.props.onChangeValue(event.target.name, selected)
  console.log(`Lovation selected: ${selected}`);
};

renderCompleteMessage = () => {
  const {classes} = this.props;
  return (
      <div className={classes.paper} >
       <Typography component="h1" variant="h5">
                    Thank you!
       </Typography>
      
      <Typography component="h5" variant="h2">
           Registration completed successfully!      
      </Typography>
       <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="/"
            >
            Click Here To Redirect To Log In Page
      </Button>
      </div>
   );
};

renderErrorMessage = () => {
  const {classes} = this.props;
  return (
    <div className={classes.paper} >
     <Typography component="h1" variant="h5">
              Registration Failed!  
     </Typography>
    <Typography component="h5" variant="h2">
            please try again        
    </Typography>
     <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            href="/signup"
          >
          Click Here To Redirect To Registration Page
    </Button>
    </div>
  );
};



renderForm (){
  const {firstName, lastName, username, password, location, usernameExist, classes, address, completed, error} = this.props;

  return (
    <Container component="main" maxWidth="xs" >
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <FormControl  className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange= {this.onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange= {this.onChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                onChange= {this.onChange}
                autoComplete="username"
                value= {username}
              />
              {username != '' ?  this.props.usernameExist ?   
              (<Form.Text className="text-danger"> This username is already in use {this.username}.</Form.Text>) : 
              (<Form.Text className="text-success"> Username is free! </Form.Text>) : null }
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange= {this.onChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="input-field"
              />
            </Grid> 
            <Grid item xs={12}>
            <DropzoneArea  accept={'image/*'}
                  onDrop={acceptedFiles => this.handleChange(acceptedFiles)} />
            </Grid> 
            <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onClick}
            >
              Sign Up
            </Button>
            </Grid> 
            </Grid>
          <Grid container >
            <Grid item>
              <Link href="signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </FormControl>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>   
    </Container>
    );
  }
render () {
  const {completed, error} = this.props;
  return (
    <Row>
        <Col></Col>
        <Col xs={6}>
          {error ?    this.renderErrorMessage() : 
          completed ? this.renderCompleteMessage() : 
                      this.renderForm()}
        </Col>
        <Col></Col>
      </Row>
    );

  }
}

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © Yishay & Yana.'}
      </Typography>
    );
  }

const mapStateToProps = (state) => {
  return {
    firstName: state['SignUp'].get('firstName'),
    lastName:  state['SignUp'].get('lastName'),
    username:  state['SignUp'].get('username'),
    password:  state['SignUp'].get('password'),
    location:  state['SignUp'].get('location'),
    lat:       state['SignUp'].get('lat'),
    lng:       state['SignUp'].get('lng'),
    picture:   state['SignUp'].get('picture'),
    usernameExist: state['SignUp'].get('usernameExist'),
    completed: state['SignUp'].get('completed'),
    error:     state['SignUp'].get('error'),
   
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (name, value) => dispatch(SignUpActions.changeValue(name, value)),
    checkIsUsernameFree: (username) => dispatch(SignUpActions.checkUserExists(username)),
    registerUser: () => dispatch(SignUpActions.registerUser()),
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignUp));






