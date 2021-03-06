
const Restaurant = require('../model/restaurant');
const Review = require('../model/review');
const User = require('../model/user');
const {secret} = require('../secrets');
const {checkToken} = require('../checkToken')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser').json();
const {getDistance,isPointWithinRadius} = require('geolib');



const multer = require('multer');
const fs = require('fs');
const upload = multer({dest: 'uploads/'});

module.exports = (app) => {
    app.get('/api/restaurants',async function(req,res,next)  {
        const restaurant = await Restaurant.find();
        if (!restaurant) {
          next("no restaurants!");
        }
        else{
          res.json(restaurant);

        }
    }  
  );    

    app.get('/api/reviews',async function(req,res,next)  {
      const {username} = req.query
      if(!username){
        const reviews = await Review.find().populate({
          path: 'user',
          model: 'User',
          select: 'username'
        }).populate({
          path: 'restaurant',
          model: 'Restaurant',
          select: ['name','location.location']
        });
        res.json({reviews:reviews});
    }
    else{
      const userFound = await User.findOne({username: username});
      const reviews = await Review.find({user: userFound._id}).populate({
        path: 'user',
        model: 'User',
        select: 'username'
      }).populate({
        path: 'restaurant',
        model: 'Restaurant',
        select: ['name','location']
      });
      res.json({reviews:reviews});
  }

});  


  app.get('/api/restaurants/add',async function(req, res, next) {
    const {name,location,lat,lng} = req.query;
    if (!name) {
      next('Input is incorrect!')
    }
    const RestaurantExists = await Restaurant.findOne({name: name});
    if(RestaurantExists)
        next('Restaurant already exists!');
    else{
        try {
            const restaurant = new Restaurant({
                name,
                location : {location: location, lat: Number(lat), lng: Number(lng)},
              })
            await restaurant.save();
            console.log("add new restaurant success")
            res.json({success: true});
        } catch (e){
          console.log("add new restaurant not success")
            res.json({success: false});
        }
    }
});

app.post('/api/restaurants/newreview', upload.single('picture'), async function(req, res, next) {
  const {user, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality,restaurant,} = req.body;

  const userFound = await User.findOne({username: user});
  if (!userFound) {
    next('Error: There is No user in the review');
  }
  const restaurantFound = await Restaurant.findOne({name: restaurant});
  if (!restaurantFound) {
    next('Error: There is No such Restaurant ');
  }
  try{
    const newReview = new Review({
    user: userFound._id,
    restaurant : restaurantFound._id,
    creationTime: Date.now(),
    bathroomQuality,
    staffKindness,
    cleanliness,
    driveThruQuality,
    deliverySpeed,
    foodQuality,
    picture: req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null,
    });

    await newReview.save();
    res.json({success: true});
    }
  catch(e){
    res.json({success: false});
  }
});

app.get('/api/restaurants/reviews', async function (req, res, next) {
  const {restaurantName} = req.query;
  console.log("from cliet in restaurant reviews "+restaurantName);
  const restaurant = await Restaurant.findOne({name: restaurantName});
  if (!restaurant) {
    next('Error: No Restaurant');
    return;
  }
  else{
  console.log("restaurant for reviews "+ restaurant.name);
  const reviews = await Review.find({restaurant: restaurant._id}).populate({
    path: 'user',
    model: 'User',
    select: 'username'
    }).populate({
      path: 'restaurant',
      model: 'Restaurant',
      select: ['name','location'],
    })
    res.json({reviews:reviews});
  }
});


app.get('/api/reviews/byvalue',async function(req,res,next)  {
  const {value}= req.query;
  console.log('in server sort reviews '+ value)
  const reviews = await Review.find().populate({
    path: 'user',
    model: 'User',
    select: 'username'
  }).populate({
    path: 'restaurant',
    model: 'Restaurant',
    select: ['name','location']
  }).sort({[value]: -1});
  console.log("reviews" + reviews)
  res.json({reviews:reviews});
  console.log('end of server api review')

}  
);  


app.post('/api/restaurants/search/advanced', upload.single('picture'),  async function (req, res, next) {
  const{userName,nameSearch,locationSearch,averageSearch} = req.body;
  console.log({userName,nameSearch,locationSearch,averageSearch})

  const user = await User.findOne({username: userName});
  const query = {};


  if (nameSearch) {
    query.name = {"$regex": nameSearch, "$options": "i"};
  }
  if (locationSearch) {
    query['location.location'] = {"$regex": locationSearch, "$options": "i"};
  }


  const restaurantsRes = await Restaurant.find(
    query);

  const restaurants = await Promise.all(restaurantsRes.map(async (rest) => {
  const reviews = await Review.find({restaurant: rest._id}).populate({
      path: 'user',
      model: 'User',
      select: 'username'
    }).populate({
      path: 'restaurant',
      model: 'Restaurant',
      select: ['name','location.location']
    })
    const total = reviews.reduce((total, rev) =>
      total + rev.bathroomQuality +
      rev.staffKindness +
      rev.cleanliness +
      (rev.driveThruQuality ? rev.driveThruQuality : 0) +
      (rev.deliverySpeed ? rev.deliverySpeed : 0) +
      rev.foodQuality, 0);
    const counter = reviews.reduce((total, rev) => total + 4 + (rev.driveThruQuality ? 1 : 0) + (rev.deliverySpeed ? 1 : 0), 0);

    const distance = getDistance(
      {latitude: user.location.lat, longitude: user.location.lng},
      {latitude: rest.location.lat, longitude: rest.location.lng}
    );

    
    
    return {
      _id: rest._id,
      reviews,
      location:{location: rest.location.location},
      rankAverage: (total ? total / counter : 0),
      distance :distance,
    }
  }));
  res.json({reviews:restaurants.filter(responserest => responserest.rankAverage > Number(averageSearch)).sort(responserest => responserest.rankAverage )})
});




app.post('/api/restaurants/search/bydistance', upload.single('picture'),  async function (req, res, next) {
  const{userName,averageRank,radiusFromMe} = req.body;
  console.log({userName,averageRank,radiusFromMe})

  const user = await User.findOne({username: userName});
  console.log(user);
  const restaurantsRes = await Restaurant.find();
  console.log(restaurantsRes);

  const restaurants = await Promise.all(restaurantsRes.map(async (rest) => {
  const reviews = await Review.find({restaurant: rest._id}).populate({
      path: 'user',
      model: 'User',
      select: 'username'
    }).populate({
      path: 'restaurant',
      model: 'Restaurant',
      select: ['name','location.location']
    })
    const total = reviews.reduce((total, rev) =>
      total + rev.bathroomQuality +
      rev.staffKindness +
      rev.cleanliness +
      (rev.driveThruQuality ? rev.driveThruQuality : 0) +
      (rev.deliverySpeed ? rev.deliverySpeed : 0) +
      rev.foodQuality, 0);
    const counter = reviews.reduce((total, rev) => total + 4 + (rev.driveThruQuality ? 1 : 0) + (rev.deliverySpeed ? 1 : 0), 0);
    const distance = getDistance(
      {latitude: user.location.lat, longitude: user.location.lng},
      {latitude: rest.location.lat, longitude: rest.location.lng}
    );
    const isPointWithin = isPointWithinRadius(
      {latitude: user.location.lat, longitude: user.location.lng},
      {latitude: rest.location.lat, longitude: rest.location.lng},
      Number(radiusFromMe)*1000
    );
    console.log({latitude: user.location.lat, longitude: user.location.lng});
    console.log( {latitude: rest.location.lat, longitude: rest.location.lng});

    return {
      id: rest._id,
      name: rest.name,
      location: {location: rest.location.location},
      rankAverage: (total ? total / counter : 0),
      distance: distance,
      isPointWithin: isPointWithin
    }
  }));
  console.log(restaurants);

  if(Number(averageRank)!=0 & Number(radiusFromMe)!=0) 
    res.json({restaurants:restaurants.filter(responserest => responserest.rankAverage >= Number(averageRank)).filter(responserest => responserest.isPointWithin).sort(responserest => responserest.rankAverage ).sort(responserest => responserest.rankAverage ).sort(responsedist => responsedist.distance )})
  else if(Number(averageRank)!= 0)
    res.json({restaurants:restaurants.filter(responserest => responserest.rankAverage >= Number(averageRank)).sort(responserest => responserest.rankAverage ).sort(responserest => responserest.rankAverage ).sort(responsedist => responsedist.distance )})
  else 
    res.json({restaurants:restaurants.filter(responserest => responserest.isPointWithin ).sort(responserest => responserest.rankAverage ).sort(responserest => responserest.rankAverage ).sort(responsedist => responsedist.distance)})
  });

app.get('/api/review/delete', async function (req, res, next) {
  const {id} = req.query;
  try{
     await Review.deleteOne({_id: id});
     res.json({success: true});
     return;
    }
    catch{
        res.json({success: false});
    }
  });





  app.post('/api/review/update', upload.single('picture'), async function (req, res, next) {
    const {reviewId, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality} = req.body;
    const review = await Review.findOne({_id: reviewId})
    try{
      review.bathroomQuality = bathroomQuality;
      review.staffKindness = staffKindness;
      review.cleanliness = cleanliness;
      review.driveThruQuality = driveThruQuality;
      review.deliverySpeed = deliverySpeed;
      review.foodQuality = foodQuality;
      review.picture = req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null;

      await review.save();
      res.json({success:true})

    }
    catch{
      res.json({success:false})
    }
  });

}


