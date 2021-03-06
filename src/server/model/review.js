let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
    creationTime: {type:Date},
    bathroomQuality: {type: Number,min: 1, max:5},
    staffKindness: {type: Number,min: 1, max:5},
    cleanliness: {type: Number,min: 1, max:5},
    driveThruQuality: {type: Number,min: 0, max:5},
    deliverySpeed: {type: Number,min: 0, max:5},
    foodQuality: {type: Number,min: 1, max:5},
    picture: { data: Buffer, contentType: String},
  });

module.exports = mongoose.model('Review', reviewSchema);
