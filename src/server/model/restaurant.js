let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
    name: String,
    location:{type: {location:String ,lat: Number, lng: Number}},
  });

module.exports = mongoose.model('Restaurant', restaurantSchema);
