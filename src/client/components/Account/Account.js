import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import AccountActions from './actions';import 'typeface-roboto';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useStyles} from './index';
import {DropzoneArea} from '../Dropzone';
import {ScrollPanel} from 'primereact/scrollpanel';
import Rating from '@material-ui/lab/Rating';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  FormControl,
  LinearProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem 
 
} from '@material-ui/core';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import EditIcon from "material-ui/svg-icons/image/edit";
import TrashIcon from "material-ui/svg-icons/action/delete";

class Account extends React.Component {
  
  componentDidMount() {
    this.props.onChangeValue('firstName',this.props.user.firstName);
    this.props.onChangeValue('lastName',this.props.user.lastName);
    this.props.onChangeValue('username',this.props.user.username);
    this.props.onChangeValue('location',this.props.user.location.location);
    this.props.onChangeValue('picture',this.props.user.picture);
    this.props.onChangeValue('requireAuth',this.props.requireAuth);
    this.props.getUserReviews(this.props.user.username)
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('newlocation'), {});
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
}

//--------------------------onClick,onChange Functions---------------------------------------------


  onChange = (event) =>  this.props.onChangeValue(event.target.id,event.target.value);
  onChangePicture = file => this.props.onChangeValue('picture', file);

  onUpdateClick = event=>{
    event.preventDefault();
    this.props.onUpdate();
  }
  noDelivery = event=>{
    event.preventDefault();
    this.props.onChangeValue('driveThruQuality',0);
    this.props.onChangeValue('deliverySpeed',0);
    this.props.onChangeValue('withDelivery',!this.props.withDelivery);

  }
  onClickUpdateUserName = event => {
    event.preventDefault();
    console.log('The Button was clicked.');
    this.props.updateUserName(this.props.username,this.props.newusername);
  }

  onClickUpdateLocation = event => {
    event.preventDefault();
    console.log('The Button was clicked.');
    this.props.updateLocation(this.props.username,this.props.newlocation,this.props.newlat,this.props.newlng);
  }

  handlePlaceSelect() {
    var place = this.autocomplete.getPlace();
    console.log("handle place change")
    this.props.onChangeValue('newlocation',place.formatted_address)
    this.props.onChangeValue('newlat', place.geometry.location.lat());
    this.props.onChangeValue('newlng', place.geometry.location.lng());
  }
  
  arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };
//-------------------------------------------Edit Review Render---------------------------------------

renderReviewForm(){
  const {update,updateCompleted} = this.props;
  return(
        <div>
          <Dialog  open={update}   aria-labelledby="form-dialog-title">
          <DialogContent>
            {this.renderEditReview()}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={()=>this.props.onChangeValue('update', false)} color="primary">
              {updateCompleted ?"OK":"Cancel"}
            </Button>
          </DialogActions>
          </Dialog>
          </div>

      )
}
  renderEditReview(){
    const {
      restaurant,
      bathroomQuality,
      staffKindness,
      cleanliness,
      driveThruQuality,
      deliverySpeed,
      foodQuality,
      classes,
      openbathroomQ,
      opencleanin,
      opendeliverysp,
      opendriveThr,
      openfoodqu,
      openstaffK,
      withDelivery,
      
    } = this.props;
      return(
      <Box>
        <Card>
          <form id="title" autoComplete="off" noValidate>
            <Divider />
              <CardHeader
                title="Edit Selected Review" 
                subheader = "You can change the score of your review "/>
              <Divider />
              <Container component="main" maxWidth="xl"  spacing={3}>
              <CardContent>
              <Grid 
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                spacing={1}
                >
              </Grid>
          <Grid>
          <Grid container  >
          <FormControl className={classes.formControl}>
          <Typography > Bathroom Quality</Typography>
          <Rating  onChange= {(e,val)=>this.props.onChangeValue("bathroomQuality",val)} value={bathroomQuality} name="bathroomQuality" />
          <Typography > Staff Kindness </Typography>
          <Rating onChange= {(e,val)=>this.props.onChangeValue("staffKindness",val)} value={staffKindness} name="staffKindness"/>
          <Typography > Cleanliness </Typography>
          <Rating onChange= {(e,val)=>this.props.onChangeValue("cleanliness",val)} value={cleanliness}   name="cleanliness"/>
          <Typography > Food Quality </Typography>
          <Rating onChange= {(e,val)=>this.props.onChangeValue("foodQuality",val)} value={foodQuality}   name="foodQuality"/>
          {withDelivery ? <div> 
          <Typography > Delivery Speed </Typography>
          <Rating onChange= {(e,val)=>this.props.onChangeValue("deliverySpeed",val)} value={deliverySpeed}   name="deliverySpeed"/>
          <Typography > Drive Thru Quality </Typography>
          <Rating onChange= {(e,val)=>this.props.onChangeValue("driveThruQuality",val)} value={driveThruQuality}   name="driveThruQuality"/>
          </div> : null}
          <Button color="primary" onClick={this.noDelivery}> {withDelivery? "No Delivery": "Rate Delivery"} </Button>
          </FormControl>
          </Grid>
            <Grid item xs={12}>
              <DropzoneArea accept={'image/*'}
                  onDrop={acceptedFiles => this.onChangePicture(acceptedFiles)} />
            </Grid> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onUpdateClick}
            >
              Edit Review
              </Button>
           </Grid>
            </CardContent>
          </Container>
          </form>
      </Card>
    </Box>
    )
  }
  
//---------------------------------------------No User Render--------------------------------------------


  renderNoUser = () => {
    const {classes} = this.props;
    return (
      <div className={classes.paper} >
       <Typography component="h1" variant="h1">
                No user is logged in!  
       </Typography>
      <Typography component="h5" variant="h5">
              please signIn       
      </Typography>
       <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              href="/signin"
            >
            Click Here To Redirect To SignIn Page
      </Button>
      </div>
    );
  };
  

//------------------------------Modify username and location Render------------------------------------------

  renderModifyDetails(){
    const {username,location} = this.props;
    return (
      <Box >
      <Card >
         <Divider />
          <CardHeader
            title="Profile Details" />
          <Divider />
          <CardContent>
          <Grid 
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
            spacing={1}
            >
            <Grid container item >
            <Typography variant="h6">Current Username</Typography> 
          </Grid>
          <Grid container item  >
          <Typography variant="subtitle1">{username}</Typography> 
          </Grid>
          <Grid container item >
            <Typography variant="h6">Current Location</Typography> 
          </Grid>
          <Grid container item  >
          <Typography variant="subtitle1">{location}</Typography> 
          </Grid>
           </Grid>
          </CardContent>
    </Card>
    <Card >
      <form  autoComplete="off" noValidate>
      <Divider />
          <CardHeader
            subheader="The information can be edited" />
          <Divider />
          <CardContent>
          <Grid 
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
            spacing={1}
            >
            <Grid container item >
          <Typography variant="h5">Username</Typography> 
            <TextField
                  fullWidth
                  helperText="username"
                  margin="dense"
                  name="newusername"
                  id="newusername"
                  label="Enter new UserName"
                  onChange={this.onChange}
                  required
                  variant="outlined"
                />  
              </Grid>
            <Button               
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onClickUpdateUserName}
            >
              Save new Username Details
            </Button>
          <Grid container item >
          <Typography variant="h5">Location</Typography> 
            <TextField
                  fullWidth
                  helperText="user's location"
                  margin="dense"
                  name="newlocation"
                  id="newlocation"
                  label="Enter new Location"
                  required
                  variant="outlined"
                />  
          </Grid>
          </Grid>
          </CardContent>
          </form>
        </Card>
            <Button               
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onClickUpdateLocation}
            >
              Save new Location Details
            </Button>
      </Box>
    );
  };

//--------------------------------------------My Reviews Table Render----------------------------------------


  renderTableData() {
    const {reviews}  = this.props.reviews;
    console.log(this.props.reviews)
    if(reviews){
    return reviews.map((review) => {

      const {_id, user, creationTime,bathroomQuality,staffKindness,cleanliness,driveThruQuality,deliverySpeed,foodQuality,restaurant ,picture} = review //destructuring
      console.log("_id")
      console.log(_id)
      return (
          <tr key={_id}>
            <td>{user.username}</td>
            <td>{creationTime}</td>
            <td>{<Rating value={bathroomQuality} readOnly />}</td>
            <td>{<Rating value={staffKindness} readOnly />}</td>
            <td>{<Rating value={cleanliness} readOnly />}</td>
            <td>{driveThruQuality>0? <Rating value={driveThruQuality}  readOnly/>: "No Delivery"}</td>
            <td>{deliverySpeed>0? <Rating value={deliverySpeed}  readOnly/>: "No Delivery"}</td>
            <td>{<Rating value={foodQuality} readOnly />}</td>
            <td> {picture ? <img
              src={`data:${picture.contentType};base64,${this.arrayBufferToBase64(picture.data.data)}`}
              alt="profile-pic" width="50px"/>
            : null}</td>
            <td>{restaurant.name}</td>
            <td>{restaurant.location.location}</td>
            <td><Button  onClick={() =>{this.props.setEditReview(_id)}}>
                    Edit
                  </Button></td>
                  <td><Button  onClick={()=>{this.props.onDelete(_id)}}>
                    Delete 
                  </Button></td>
          </tr>
      )
    })
  }
  }

  renderMyReviews(){
    return(
      <div>
        <h1 id='title'>Reviews </h1>
        <table id='reviews'>
            <tbody>
              <tr>
              <th > User </th>
              <th > Creation Time </th>
              <th > Bathroom Quality </th>
              <th > Staff Kindness </th>
              <th > Cleanliness </th>
              <th > Drive Thru Quality </th>
              <th > Delivery Speed </th>
              <th > Food Quality </th>
              <th > Picture </th>
              <th > Restaurant </th>
              <th > Restaurant's Location </th>
              <th> Edit</th>
              <th> Delete</th>
            </tr>
              {this.renderTableData()}
            </tbody>
        </table>
        </div>
    );}

  renderIsReveiews(){
    const {isReviews} = this.props;
    return(
        <Box >
      <Card >
         <Divider />
          <CardHeader
            title="My Reviews" />
          <Divider />
          <CardContent>
          <Grid 
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start"
            spacing={1}
            >
            <div>
              {isReviews ? this.renderMyReviews():
          <Typography variant="subtitle1">You Don't Have Any Reviews Yet!</Typography>
              }
              <div> 
             </div>  
              </div>
        </Grid>
        </CardContent>

      </Card>
      </Box>

    )
}

  renderReviewsTab(){
    const {reviews,isReviews,error,completed}  = this.props;
    return (
      <div>
        {error ?    this.renderError() : 
        completed ? this.renderCompleted() : 
        this.renderIsReveiews()}
        </div>      
    );
  };


//-----------------Complete and Error and Update Complete and Error Render-------------------------------------

  renderCompleted = () => {
    const {classes} = this.props;
    return (
        <div className={classes.paper} >
        <Typography component="h5" variant="h2">
            Your Profile was updated Successfuly!      
        </Typography>
        <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                href="/signin"
              >
              Click Here To Redirect To SignIn Page to SignIn with your new Details
        </Button>
        </div>
    );
  };

  renderError= () => {
    const {classes} = this.props;
    return (
      <div className={classes.paper} >
            <Typography component="h1" variant="h5">
                Oh No Your changes could not be saved!  
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
              href="/account"
            >
            Click Here To Redirect To Profile Page
      </Button>
      </div>
    );
  };

  renderUpdateCompleted = () => {
    const {classes} = this.props;
    return (
        <div className={classes.paper} >
        <Typography component="h5" variant="h2">
            Your Review was updated Successfuly!      
        </Typography>
         <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                href="/account"
              >
              Click Here To Redirect To your Profile
        </Button>
        </div>
     );
  };
  
  renderUpdateError = () => {
    const {classes} = this.props;
    return (
        <div className={classes.paper} >
        <Typography component="h5" variant="h2">
            Oh no Your review count not be updated, please try again!      
        </Typography>
         <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                href="/account"
              >
              Click Here To Redirect To your Profile
        </Button>
        </div>
     );
  };
  
  
//-----------------------------Account Top Profile Render-------------------------------------------


  renderAccountProfile() {
    const {className,classes,user, ...rest } = this.props;
    return (
    <Card >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
            {`${user.firstName}  ${user.lastName}`}
            </Typography>
            
          </div>
          {user.picture ? <img
              src={`data:${user.picture.contentType};base64,${this.arrayBufferToBase64(user.picture.data.data)}`}
              alt="profile-pic" width="300px"/>
            : null}
        </div>
        <div className={classes.progress}>
         
        </div>
      </CardContent>
    </Card>
  );
};

//-------------------------------Profile Page Render------------------------------------------------------

  renderProfile(){
    const{update,updatePage,completed,updateCompleted,user}= this.props;
    console.log("update")
    console.log(update)
    return(
      <div>
      {this.renderAccountProfile()}
      {this.renderModifyDetails()} 
      {this.renderReviewsTab()} 
      {this.renderReviewForm()}
      </div>
    )
  }

  renderUplaodProfile(){
    const {classes,user,error,completed,updateCompleted,updatePage} = this.props;
    return(
      <div className={classes.paper}>
          {error ?    this.renderError() : 
          completed ? this.renderCompleted() : 
          updateCompleted?this.renderUpdateCompleted():
          updatePage? this.renderUpdateError():
          this.renderProfile()}

    </div>
    );
  }

//------------------------------------Render-----------------------------------------------------


  render(){
    const {classes,requireAuth,user} = this.props;
    return (
      <Container component="main" maxWidth="xl"  spacing={3}>
          <div className={classes.paper}>
            {requireAuth? this.renderNoUser():this.renderUplaodProfile()}
          </div>
      </Container>
      );
    }
  }


const mapStateToProps = (state) => {
  return {
    reviews:          state['Account'].get('reviews'),
    user:             state['app'].get('user'),
    firstName:        state['Account'].get('firstName'),
    lastName :        state['Account'].get('lastName'),
    username:         state['Account'].get('username'),
    newusername:      state['Account'].get('newusername'),
    newlocation:      state['Account'].get('newlocation'),
    newlat:           state['Account'].get('newlat'),
    newlng:           state['Account'].get('newlng'),
    location:         state['Account'].get('location'),
    lat:              state['Account'].get('lat'),
    lng:              state['Account'].get('lng'),
    picture:          state['Account'].get('picture'),
    completed :       state['Account'].get('completed'),
    error:            state['Account'].get('error'),
    requireAuth:      state['app'].get('requireAuth'),
    isReviews:        state['Account'].get('isReviews'),
    updateCompleted:  state['Account'].get('updateCompleted'),
    reviewId:         state['Account'].get('reviewId'),
    bathroomQuality:  state['Account'].get('bathroomQuality'),
    staffKindness:    state['Account'].get('staffKindness'),
    cleanliness:      state['Account'].get('cleanliness'),
    driveThruQuality: state['Account'].get('driveThruQuality'),
    deliverySpeed:    state['Account'].get('deliverySpeed'),
    foodQuality:      state['Account'].get('foodQuality'),
    update:           state['Account'].get('update'),
    updatePage:       state['Account'].get('updatePage'),
    withDelivery:     state['Account'].get('withDelivery'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (name, value) => dispatch(AccountActions.changeValue(name, value)),
    getUserReviews: (username) => dispatch(AccountActions.getAllReviews(username)),
    updateUserName: (username,newusername) => dispatch(AccountActions.updateUserName(username,newusername)),
    updateLocation: (username,newlocation,newlat,newlng) => dispatch(AccountActions.updateLocation(username,newlocation,newlat,newlng)),
    onDelete: (id)=>dispatch(AccountActions.deleteReview(id)),
    onUpdate: ()=>dispatch(AccountActions.updateReview()),
    setEditReview:(id)=>dispatch(AccountActions.setEditReview(id)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Account));







