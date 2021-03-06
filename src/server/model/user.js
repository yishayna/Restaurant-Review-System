let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    location: {type: {location:String , lat: Number, lng: Number}},
    picture: {data:Buffer , content:String}
});

module.exports = mongoose.model('User', userSchema);
