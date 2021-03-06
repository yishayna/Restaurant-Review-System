import React from 'react';
import { connect } from 'react-redux';
import {Button,FormControlLabel,Avatar,Link,Grid,Box,CssBaseline,TextField,Checkbox,Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Home from '../Utiles/Home';
import {Form, Card, Row, Col} from 'react-bootstrap';
import SignInActions from './actions';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Yishay & Yana.'}
    </Typography>
  );
}


class SignIn extends React.Component {

  componentDidMount() {
  }

  onClick = event => {
    event.preventDefault();
    console.log('The Button was clicked.');
    this.props.SignInUser();
  }

  
  onChange = (event) =>  this.props.onChangeValue(event.target.id,event.target.value);
  
  renderForm() 
  {
    const {username, password, classes, completed, error} = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              value = {this.username}
              autoComplete="username"
              onChange= {this.onChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value = {this.password}
              onChange= {this.onChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onClick}

            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item>
                <Link href="/signup" variant="body1">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        </Container>
    );
  }

  renderCompleteMessage = () => {
    const {classes} = this.props;
    return (
        <div className={classes.paper} >
  
        
        <Typography component="h5" variant="h2">
             Log In completed successfully!      
        </Typography>
         <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                href="/"
              >
              Click Here To Redirect To Profile In Page
        </Button>
        </div>
     );
  };
  
  renderErrorMessage = () => {
    const {classes} = this.props;
    return (
        <div className={classes.paper} >
        <Typography component="h5" variant="h2">
        Log In Failed!      
        </Typography>
         <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                href="/"
              >
              Click Here To Redirect To Sign In Page
        </Button>
        </div>
        );
  }

  render (){
    const {completed, error} = this.props;
    return (
      <Row>
      <Col></Col>
      <Col xs={6}>
        {error ? this.renderErrorMessage() : 
        completed ? this.renderCompleteMessage() : this.renderForm()}
      </Col>
      <Col></Col>
    </Row>
    );  
  }

}
  
  
const useStyles = (theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

  const mapStateToProps = (state) => {
    return {
      username: state['SignIn'].get('username'),
      password: state['SignIn'].get('password'),
      completed: state['SignIn'].get('completed'),
      error: state['SignIn'].get('error'),
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onChangeValue: (name, value) => dispatch(SignInActions.changeValue(name, value)),
      SignInUser: () => dispatch(SignInActions.SignInUser()),
    }
  };
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignIn));



