const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');
const Restaurant = require('./model/restaurant');
var cookies = require('cookie-parser');
const Reviews = require('./model/review');

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/atd',
  port: 3000
};

//setup database
mongoose.Promise = global.Promise;
// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.mongoURL, { useNewUrlParser: true ,useUnifiedTopology: true}, (error) => {
    const restaurants = require(`${__dirname}/restaurants.json`);
    Restaurant.collection.deleteMany({})
      .then(result => Restaurant.collection.insertMany(restaurants));
    Reviews.collection.drop()
    // const reviews = require(`${__dirname}/reviews.json`);
    // Reviews.collection.deleteMany({})
    //   .then(result => Reviews.collection.insertMany(reviews));
    if (error) {
      console.error('Please make sure Mongodb is installed and running!');
      throw error;
    }else console.log('connected to database!');
  });
}



const app = express();

//body parser for json. must be done before API routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); //handle body requests
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookies());



// Add backend api routes
fs.readdirSync(__dirname + '/api').forEach((file) => {
  console.log(`./api/${file.substr(0, file.indexOf('.'))}`);
  require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
});

app.use(function (err, msg, req, res, next) {
  console.error(err.stack);
  res.status(500).json({error: err});
});

app.listen(config.port || 3000,
    () => console.log(`Listening on port ${process.env.PORT || 3000}!`));

app.get('/api', (req,res)=> {
  res.send("Hello!");
});