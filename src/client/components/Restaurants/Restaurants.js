import React from 'react';
import './restaurants.scss';
import {connect} from 'react-redux';
import RestaurantsActions from './actions'
import  '@material-ui/icons';
import 'typeface-roboto';
import {useStyles} from './index';
import {withStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
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
  Slider
 
} from '@material-ui/core';

class Restaurants extends React.Component {


  componentDidMount() {
    this.props.loadAllRestaurants();
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('location'), {});
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
  
  }


//----------------------------------onClick,onChange,onSelect functions-----------------------------------------
  onClick = event => {
    event.preventDefault();
    console.log('The Button was clicked.');
    this.props.addRestaurant(this.props.name,this.props.location,this.props.lat,this.props.lng);
  }

  onClickSort = event => {
    event.preventDefault();
    console.log('The Button was clicked.');
    this.props.getRankDistanceRestaurants();
  }
  handleSelect = selected => {
    this.props.onChangeValue(event.target.name, selected)
    console.log(`Lovation selected: ${selected}`);
  };

  onChange =  event => {
    this.props.onChangeValue(event.target.name, event.target.value)
  }


  handlePlaceSelect() {
    var place = this.autocomplete.getPlace();
    this.props.onChangeValue('location',place.formatted_address)
    this.props.onChangeValue('lat', place.geometry.location.lat());
    this.props.onChangeValue('lng', place.geometry.location.lng());
  }


//--------------------------------------------Render Functions--------------------------------------
  renderForm (){
    const {name, location, classes} = this.props;
    return (
      <Box>
        <Card >
          <form  autoComplete="off" noValidate>
            <Divider />
            <CardHeader
              title="Add Restaurant" />
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
                <Typography variant="h5">Restaurant name</Typography> 
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="name"
                  label="name"
                  type="name"
                  id="name"
                  onChange= {this.onChange}
                />
              </Grid>
              <Grid container item >
                <Typography variant="h5">Restaurant Location</Typography>             
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="location"
                    label="location"
                    name="input-field"
                  />
              </Grid> 
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.onClick}
                  >
                    Add Restaurant
                  </Button>
            </Grid> 
            </CardContent>
            <Divider/>
          </form>
        </Card>
      </Box>
    )};

//----------------------------------------Restaurants Table Render-------------------------------------------
  renderTableData() {
    const {restaurants}  = this.props;
    return restaurants.map((restaurant) => {
      const {_id, name, location } = restaurant //destructuring
      return (
          <tr key={_id}>
            <td>{name}</td>
            <td>{location.location}</td>
          </tr>
      )
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.props.restaurants[0])
    return header.map((key, index) => {
        if (key!="_id"){
          return <th key={index}>{key.toUpperCase()}</th>
      }
    })
  }

  renderTableAllRestaurants(){
    return(
    <div>
      <h1 id='title'>Restaurants </h1>
      <table id='resturants'>
        <tbody>
          <tr>{this.renderTableHeader()}</tr>
          {this.renderTableData()}
        </tbody>
      </table>
    </div>
    );
  }


//-------------------------Restaurants Selected table by Distance from me and Rank Render--------------------------

  renderTableDataSelected() {
    const {restaurantDistance}  = this.props;
    console.log("table data selected restaurantDistance")
    console.log(restaurantDistance)
    if(restaurantDistance){
        return restaurantDistance.map((restaurant) => {
          const {id, name, location,rankAverage,distance } = restaurant //destructuring
          return (
              <tr key={id}>
                <td>{name}</td>
                <td>{location.location}</td>
                <td>{rankAverage}</td>
                <td>{distance}</td>

              </tr>
          )
        })}
    else{
      return(
        <Typography variant="subtitle1">You Don't Have Any Reviews Yet!</Typography>
      )
    }
  }

  renderTableSelectedRestaurants(){
    return(
      <Box>   
        <Card>    
          <h1 id='title'>Restaurants By Distance </h1>
            <table id='resturants'>
              <tbody>
                <tr>
                  <th > name </th>
                  <th > location </th>
                  <th > average Rank </th>
                  <th > Distance From Me </th>
                </tr>
                    {this.renderTableDataSelected()}
              </tbody>
            </table>
        </Card>  
      </Box>                  
  );
  }


//---------------------------------------------------Render Complete and Error-----------------------------


renderCompleteMessage = () => {
  const {classes} = this.props;
  return (
      <div className={classes.paper} >
       <Typography component="h1" variant="h5">
                    Thank you!
       </Typography>
      
      <Typography component="h5" variant="h2">
           A new Restaurant was added successfully!      
      </Typography>
       <Button 
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        href="/restaurants"
      >
      Click Here To Redirect To Restaurants Page
    </Button>
  </div>
   );
};

renderErrorMessage = () => {
  const {classes} = this.props;
  return (
    <div className={classes.paper} >
     <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            href="/restaurants"
          >
          Click Here To Redirect To Restaurants Page
    </Button>
    </div>
  );
};

//----------------------------------------Search By Distance from me and Rank form Render-----------------


renderSearchRankDistanceForm(){
  const {classes,averageRank} = this.props;
    return(
        <Box>
          <Card>
            <form  autoComplete="off" noValidate>
              <Divider />
                <CardHeader
                  title="Sort Restaurants"
                  subheader=" You can Search for Restaurants by Distance from you location or by average score" />
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
                  <Typography id="range-slider" gutterBottom>
                  Radius From Me
                 </Typography>
                        <Slider
                          variant="outlined"
                          required
                          min={0}
                          step={1}
                          max={200}
                          id="radiusFromMe"
                          name="radiusFromMe"
                          onChange= {(e,val)=>this.props.onChangeValue("radiusFromMe",val)}
                          valueLabelDisplay="auto"
                          aria-labelledby="range-slider"

                        />
                      </Grid>                   
                      <Grid container item >
                      <Rating
                          name="simple-controlled"
                          onChange= {(e,val)=>this.props.onChangeValue("averageRank",val)}
                          value= {averageRank==-1?0:averageRank}
                        />
                      </Grid>
                    </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onClickSort}
              >
                Show Restaurants By Distance From Me
              </Button>
            </CardContent>
          </form>
        </Card>
      </Box>
  )
}

//--------------------------------------------Restaurant page final render-----------------------------------------------

renderRestaurants(){
  return(
    <div>
        {this.renderTableAllRestaurants()}
        {this.renderSearchRankDistanceForm()}
        {this.props.restaurantDistance.length>0? this.renderTableSelectedRestaurants():null}
        {this.renderForm()}
    </div>
  )
}


render() {
  const {completed, error,classes} = this.props;
    return (
      <Container component="main" maxWidth="lg"  spacing={3}>
        <div className={classes.paper}>
          {error ?    this.renderErrorMessage() : 
          completed ? this.renderCompleteMessage() : 
                      this.renderRestaurants()}
        </div>
      </Container>
    );
  }
}

// AVOID .toJS() in mapStateToProps
const mapStateToProps = (state) => {
    return {
      restaurants:        state['Restaurants'].get('restaurants'),
      name:               state['Restaurants'].get('name'),
      location:           state['Restaurants'].get('location'),
      lat:                state['Restaurants'].get('lat'),
      lng:                state['Restaurants'].get('lng'),
      completed:          state['Restaurants'].get('completed'),
      error:              state['Restaurants'].get('error'),
      restaurantDistance: state['Restaurants'].get('restaurantDistance'),
      averageRank:        state['Restaurants'].get('averageRank'),
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    console.log("Restaurant dispach");

    return {
      onChangeValue: (name, value) => dispatch(RestaurantsActions.changeValue(name, value)),
      loadAllRestaurants: () => dispatch(RestaurantsActions.getAllRestaurants()),
      addRestaurant: (name,location,lat,lng)=> dispatch(RestaurantsActions.newRestaurant(name,location,lat,lng)),
      getRankDistanceRestaurants:()=>dispatch(RestaurantsActions.getRankandDistanceRestaurants()),
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Restaurants));
