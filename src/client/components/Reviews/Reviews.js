import React from 'react';
import './Reviews.scss';
import {connect} from 'react-redux';
import ReviewsActions from './actions'
import 'typeface-roboto';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useStyles} from './index';
import {DropzoneArea} from '../Dropzone';
import {withStyles} from '@material-ui/core/styles';
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
  MenuItem ,
  SimpleDialog 
 
} from '@material-ui/core';


class Reviews extends React.Component {


  componentDidMount() {
    this.props.loadAllReviews();
    this.props.loadAllRestaurants();
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('location'), {});
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  }

//----------------------------onChange , on Select, onClick Function---------------------------------

   
    onChangePicture = file => this.props.onChangeValue('picture', file);
    
    noDelivery = event=>{
      event.preventDefault();
      this.props.onChangeValue('driveThruQuality',0);
      this.props.onChangeValue('deliverySpeed',0);
      this.props.onChangeValue('withDelivery',!this.props.withDelivery);
  
    }
    onClick = event => {
    event.preventDefault();
    this.props.addReview();
    }
    onClickAddReviewDialog = event => {
      this.props.onChangeValue("error", false)
      this.props.onChangeValue("completed", false)
      event.preventDefault();
      this.props.onChangeValue("addReviewDialogopen", !this.props.addReviewDialogopen)
    }


    onCloseDialog = event => {
      event.preventDefault();
      this.props.onChangeValue("initForm", null)
      this.props.onChangeValue("addReviewDialogopen", !this.props.addReviewDialogopen)
      this.props.loadAllReviews();
    }
   

    onClickAdvanceSearch = event => {
      event.preventDefault();
      console.log('The Button was clicked.');
      this.props.advancedSearch();
    }
    
    onClickAllReviews = event => {
        event.preventDefault();
        console.log('The Button was clicked.');
        this.props.loadAllReviews();
    }

    onClickSort = event => {
      event.preventDefault();
      console.log('The Button was clicked.');
      this.props.sortByValue(this.props.sortValue);
    }
    
    onClickSearch = event =>{
      event.preventDefault();
      console.log("restaurant search value before func is "+ this.props.restaurantSearch)
      this.props.searchReviewsOfRestaurant(this.props.restaurantSearch);
    }
    
    onChange =  event => {
      console.log("changing now " +event.target.name);
      this.props.onChangeValue(event.target.name, event.target.value)
    }

    arrayBufferToBase64 = (buffer) => {
      let binary = '';
      const bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return window.btoa(binary);
    };

    handleSelect = selected => {this.props.onChangeValue(event.target.name, selected)};
    handleCloseopendeliverysp = selected => {this.props.onChangeValue('opendeliverysp', false)};
    handleOpenopendeliverysp = selected => {this.props.onChangeValue('opendeliverysp', true)};
    handleCloseopenfoodqu = selected => {this.props.onChangeValue('openfoodqu', false)};
    handleOpenopenfoodqu = selected => {this.props.onChangeValue('openfoodqu', true)};
    handleCloseopenbathroomQ = selected => {this.props.onChangeValue('openbathroomQ', false)};
    handleOpenopenbathroomQ = selected => {this.props.onChangeValue('openbathroomQ', true)};
    handleCloseopenstaffK = selected => {this.props.onChangeValue('openstaffK', false)};
    handleOpenopenstaffK = selected => {this.props.onChangeValue('openstaffK', true)};   
    handleOpenopencleanin = selected => {this.props.onChangeValue('opencleanin', true)};   
    handleCloseopencleanin = selected => {this.props.onChangeValue('opencleanin', false)};
    handleOpenopendriveThr = selected => { this.props.onChangeValue('opendriveThr', true)};
    handleCloseopendriveThr = selected => {this.props.onChangeValue('opendriveThr', false)};
    
    handlePlaceSelect() {
      var place = this.autocomplete.getPlace();
      this.props.onChangeValue('locationSearch',place.formatted_address);
    }
  
//-------------------------Sort Reviews Render-----------------------------------------------------

renderSortReviews (){
    const {
        classes,
        sortValue,
      } = this.props;  
    return (
      <Box>
        <Card>
           <form  autoComplete="off" noValidate>
            <Divider />
          <CardHeader
            title="Sort Reviews by Specific Value"
            subheader = "you can search by creationTime, bathroom quailty" />
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
            <FormControl  className={classes.form} noValidate>
             <Autocomplete
                freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={['creationTime','bathroomQuality','staffKindness','cleanliness','driveThruQuality','deliverySpeed','foodQuality']}
                    renderInput={params  => (
                    <TextField
                        {...params }
                        label="Restaurant Name"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        id = "sortValue"
                        name = "sortValue"
                        value = {sortValue}
                        autoComplete="sortValue"
                        onSelect = {this.onChange}
                        onChange= {this.onChange}
                        onClick ={this.onChange}   //////// when pressing a specific options from autocomplete it does not save the restaurant 
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                    )}
                />
                </FormControl>
             </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onClickSort}
          >
            Sort Reviews
            </Button>
      </Grid>
    </CardContent>
  </form>
</Card>
</Box>
      );
    }


//---------------------------------Advanced Search Form Render---------------------------------

renderAdvancedSearch(){
  const {classes,restaurants,nameSearch,locationSearch,averageSearch} = this.props;
  return(
    <Box>
      <Card>
      <form  autoComplete="off" noValidate>
         <Divider />
          <CardHeader
            title="Advanced Search"
            subheader="you can search for restaurants by name, by location, by both, by average score" />
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
          <FormControl  className={classes.form} noValidate>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={restaurants.map(option => option.name)}
                renderInput={params  => (
                <TextField
                    {...params }
                    label="Restaurant Name"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    id= "nameSearch"
                    name = "nameSearch"
                    value = {nameSearch}
                    autoComplete="nameSearch"
                    onSelect= {this.onChange}
                    onChange= {this.onChange}
                    onClick ={this.onChange}   //////// when pressing a specific options from autocomplete it does not save the restaurant 
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                  )}
                 />
            </FormControl>  
          </Grid>
          <Grid container item >
          <FormControl  className={classes.form} noValidate>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="location"
              label="location"
              name="input-field"
              autoComplete="location"
            />
            </FormControl>
         </Grid> 
         <Grid container item >
           <FormControl  className={classes.form} noValidate>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="averageSearch"
              label="Average score bigger than"
              name="averageSearch"
              value = {averageSearch}
              onChange= {this.onChange}
              autoComplete="averageSearch"
            />
            </FormControl>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={this.onClickAdvanceSearch}
        >
          Advance Search For Reviews
        </Button>
  </Grid>
  </CardContent>
  </form>
</Card>
</Box>
)
}

//---------------------------------------Basic Search Render-----------------------------------------------


renderBasicSearch(){
  const {classes,restaurantSearch,restaurants}= this.props;
  return(
    <Box>
      <Card>
      <form  autoComplete="off" noValidate>
         <Divider />
          <CardHeader
            title="Basic Search"
            subheader="you can search for restaurants by name" />
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
              <FormControl  className={classes.form} noValidate>
                <Autocomplete
                      id="free-solo-2-demo"
                      options={restaurants.map(option => option.name)}
                      renderInput={params  => (
                      <TextField
                          {...params }
                          label="Restaurant Name"
                          margin="normal"
                          variant="outlined"
                          fullWidth
                          id="restaurantSearch"
                          name = "restaurantSearch"
                          autoComplete="restaurantSearch"
                          onSelect= {this.onChange}
                          onChange= {this.onChange}
                          onClick ={this.onChange}   //////// when pressing a specific options from autocomplete it does not save the restaurant 
                          InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                        )}
                  />
                </FormControl>
              <Divider/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onClickSearch}
            >
              Search For Reviews
            </Button>
            </Grid>
           </Grid>
         </CardContent>
        </form>
       </Card>
  </Box>
  )
}


//-------------------------------------------All Reviews Buttom Render--------------------------------------


renderAllReviews(){
  const {classes}= this.props
  return(
        <Box>
          <Card>
            <Divider/>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onClickAllReviews}
              >
                All Reviews
              </Button>
              <Divider/>
          </Card>
        </Box>
  )
}

//------------------------------------Add Review Form Render----------------------------------------------------

renderAddReview(){
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
    restaurants,
    completed,
    error,
    withDelivery,
  } = this.props;
      if(completed){
        return (<Typography > Review Added Successfully! </Typography>
          )
      }
      else if (error)
        return(<Typography > Error! </Typography>)
      else{
    return(
    <Box>
      <Card>
        <form id="title" autoComplete="off" noValidate >
           
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
             <Grid container item >
                <FormControl className={classes.formControl}>
                <Autocomplete
                  freeSolo
                  id="title"
                  disableClearable
                  options={restaurants.map(option => option.name)}
                  renderInput={params  => (
                    <FormControl className={classes.formControl}>
                    <TextField
                      {...params }
                      label="Restaurant Name"
                      value= {restaurant} 
                      id = "restaurant"
                      name = "restaurant"
                      onSelect = {this.onChange}
                      onChange= {this.onChange}
                      onClick ={this.onChange}   //////// when pressing a specific options from autocomplete it does not save the restaurant 
                      InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                      </FormControl>
                  )}
            />
          </FormControl>
                  </Grid>
            </Grid>
        <Grid>
        <Grid container  >
          <FormControl className={classes.formControl}>
          {<div><Typography > Bathroom Quality</Typography>
          <Rating  onChange= {(e,val)=>this.props.onChangeValue("bathroomQuality",val)} value={bathroomQuality} name="bathroomQuality" />
          <Typography > Staff Kindness </Typography>
          <Rating onChange= {(e,val)=>this.props.onChangeValue("staffKindness",val)} value={staffKindness} name="staffKindness"/>
          <Typography > Cleanliness </Typography>
          <Rating onChange= {(e,val)=>this.props.onChangeValue("cleanliness",val)} value={cleanliness}   name="cleanliness"/>
          <Typography > Food Quality </Typography>
          <Rating onChange= {(e,val)=>this.props.onChangeValue("foodQuality",val)} value={foodQuality}   name="foodQuality"/>
          </div>}
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
          <DropzoneArea  accept={'image/*'}
                  onDrop={acceptedFiles => this.onChangePicture(acceptedFiles)} />
                            </Grid> 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onClick}
          >
            Add Review
            </Button>
         </Grid>
          </CardContent>
        </Container>
        </form>
    </Card>
  </Box>
    )
}

}


  

//-----------------------------------------Reviews Table Render---------------------------------

  renderTableData() {
    const {reviews}  = this.props.reviews;
    console.log("render table data")
    console.log(this.props.reviews)
    if(reviews){
      return reviews.map((review) => {
        const { _id,user, creationTime,bathroomQuality,staffKindness,cleanliness,driveThruQuality,deliverySpeed,foodQuality,restaurant ,picture} = review //destructuring
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
              alt="profile-pic" width="100"/>
            : null}</td>
              <td>{restaurant.name}</td>
              <td>{restaurant.location.location}</td>
            </tr>
      )
    })
  }
  }

  renderReviewsTable(){
    const {reviews,isReviews} = this.props;
    console.log("reviews table render")
    console.log(typeof(reviews.reviews))
    if(isReviews){
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
                  </tr>
                    {this.renderTableData()}
                  </tbody>
              </table>
            </div>
        )
      }
      else{
        return(
          <Box>
            <Card>
              <h1 id='title'>Reviews </h1>
              <Typography id="title" component="h4" variant="h4">
                There is no reviews in the system
                </Typography>
                <Typography id="title" component="h5" variant="h5">
                *  Be the First to add a review  * 
                </Typography> 
            </Card>
          </Box>
        )
      }
  }


//------------------------------------Reviews Page final Render--------------------------------------
  renderReviewForm(){
    const {addReviewDialogopen,completed,error} = this.props;
    return(
          <div>
          <Button variant="outlined" color="primary" onClick={this.onClickAddReviewDialog} >
            Add a new Review
            </Button>
            <Dialog  open={addReviewDialogopen} onClose={this.onCloseDialog}  aria-labelledby="form-dialog-title" onCloseDialog={this.renderReviewsTable}>
            <DialogTitle id="form-dialog-title">Add Review</DialogTitle>
            <DialogContent>
              {this.renderAddReview()}
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.onCloseDialog} color="primary">
                {completed || error ?"OK":"Cancel"}
              </Button>
            </DialogActions>
            </Dialog>
            </div>
        );
  }




  render() {
        return(
          <Container component="main" maxWidth="xl"  spacing={3}>
            {this.renderReviewsTable()}
            {this.renderReviewForm()}
            {this.renderAllReviews()}
            {this.renderBasicSearch()}
            {this.renderAdvancedSearch()}
            {this.renderSortReviews()}
          </Container>          
      );
    }
  }

const mapStateToProps = (state) => {
    console.log("in map state"  +   state['Reviews'].get('reviews'))
    console.log("in map state restaurants"  +   state['Reviews'].get('restaurants'))
    return {
        openbathroomQ :     state['Reviews'].get('openbathroomQ'),
        openstaffK:         state['Reviews'].get('openstaffK'),
        opencleanin:        state['Reviews'].get('opencleanin'),
        opendriveThr:       state['Reviews'].get('opendriveThr'),
        opendeliverysp:     state['Reviews'].get('opendeliverysp'),
        openfoodqu:         state['Reviews'].get('openfoodqu'),
        reviews:            state['Reviews'].get('reviews'),
        user:               state['Reviews'].get('user'),
        bathroomQuality:    state['Reviews'].get('bathroomQuality'),
        staffKindness:      state['Reviews'].get('staffKindness'),
        cleanliness:        state['Reviews'].get('cleanliness'),
        driveThruQuality:   state['Reviews'].get('driveThruQuality'),
        deliverySpeed:      state['Reviews'].get('deliverySpeed'),
        foodQuality:        state['Reviews'].get('foodQuality'),
        picture:            state['Reviews'].get('picture'),
        restaurant:         state['Reviews'].get('restaurant'),
        restaurants:        state['Reviews'].get('restaurants'),
        completed:          state['Reviews'].get('completed'),
        error:              state['Reviews'].get('error'),
        restaurantSearch:   state['Reviews'].get('restaurantSearch'),
        sortValue:          state['Reviews'].get('sortValue'),
        nameSearch:         state['Reviews'].get('nameSearch'),
        locationSearch:     state['Reviews'].get('locationSearch'),
        averageSearch:      state['Reviews'].get('averageSearch'),
        isReviews:          state['Reviews'].get('isReviews'),
        addReviewDialogopen: state['Reviews'].get('addReviewDialogopen'),
        withDelivery:     state['Reviews'].get('withDelivery'),

          }
  };
  
  const mapDispatchToProps = (dispatch) => {
    console.log("Reviews dispach");

    return {
      onChangeValue: (name, value) => dispatch(ReviewsActions.changeValue(name, value)),
      loadAllReviews: () => dispatch(ReviewsActions.getAllReviews()),
      loadAllRestaurants: () => dispatch(ReviewsActions.getAllRestaurants()),
      addReview: () => dispatch(ReviewsActions.addReview()),
      searchReviewsOfRestaurant:(restaurantSearch) =>dispatch(ReviewsActions.SearchReviews(restaurantSearch)),
      sortByValue: (value)=>dispatch(ReviewsActions.sortReviews(value)),
      advancedSearch:()=>dispatch(ReviewsActions.advancedSearch()),
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Reviews));
