const UserModel = require('../model/user');
const ReviewModel = require('../model/review');
const User = require('../model/user');
const {secret} = require('../secrets');
const {checkToken} = require('../checkToken')
const jwt = require('jsonwebtoken');


const multer = require('multer');
const fs = require('fs');
const upload = multer({dest: 'uploads/'});

let _handleError = function(err){
    if (err) return console.log(err);
};

module.exports = (app) => {
    app.post('/api/signup',upload.single('picture'), async function(req, res, next) {
        const {firstName,lastName,username,password,location,lat,lng,picture} = req.body;
        console.log({firstName,lastName,username,password,location,lat,lng});
        if (!username) {
          next('Input is incorrect!')
        }
        const userExist = await User.findOne({username:username});
        if(userExist)
            next('User already exists!');
        else{
            try {
                const user = new User({
                    firstName,
                    lastName,
                    username,
                    password,
                    location: {location:location ,lat: Number(lat), lng: Number(lng)},
                    picture: req.file ? {data: fs.readFileSync(req.file.path),content:req.file.mimetype}: null
                })
                await user.save();
                res.json({success: true});
                //res.send("Registration Succeeded");
            } catch (e){
                res.json({success: false});
            }
        }
    });
    
    app.post('/api/signin', async function(req, res, next) {
        const {username,password} = req.body;
        console.log({username,password});
        if (!username || ! password) {
          next('Input is incorrect!')
        }
        const userExist = await User.findOne({username:username});
        if(!userExist)
            next('User does not exists!');
        //we did not check if password is correct or not.
        else{
            const payload = {username};
            const token = jwt.sign(payload, secret, {
              expiresIn: '30m'
            });
            console.log("cookies defined");
            console.log(token);
            res.cookie('token', token, {httpOnly: true}).status(200).json({success: true});
      }
    });

    app.get('/api/checkToken',checkToken, async function (req, res) {
        console.log("check token");
        const user = await User.findOne({username: req.authenticatedUser});
        res.status(200).json({user: user ? user : null});
      });


    // check if username already exist
    app.get('/api/userexists', async function (req, res) {  
        const {username} = req.query;
        const userExist = await User.findOne({username:username});
        res.status(200).json({exists: !!userExist});
        });

        
    app.post('/api/logout', function (req, res, next) {
        res.status(200).clearCookie('token').json({});
      });


    app.get('/api/user/editusername', async function (req, res, next) {
    const {curruserName,newuserName} = req.query;
        console.log({curruserName,newuserName})
        const currUser =  await User.findOne({username:curruserName});
        const userExist = await User.find({newuserName})>0;
        if (userExist) {
            next('username already exists!');
        }
        else {
            try{
                const user = await User.findOne({username: curruserName});
                user.username = newuserName;
                await user.save();
            }
            catch{
                res.json({success: false}); 
                return;
            }
        }
        
        res.json({success: true});
    });
    
    app.get('/api/user/editlocation', async function (req, res, next) {
        const {curruserName,newlocation,lat,lng} = req.query;
        console.log({curruserName,newlocation,lat,lng})
        try{
            const user = await User.findOne({username: curruserName})
            user.location = {location: newlocation, lat: Number(lat), lng: Number(lng)};
            await user.save();
        }
        catch{
            res.json({success: false}); 
            return;
        }
        res.json({success: true});
    });
    

    app.get('/api/users', async function (req, res, next) {
        const users = await User.find();
        console.log(users)
        res.json(users);
    });


    app.get('/api/user', async function (req, res, next) {
        const {username} = req.query;
        const user = await User.findOne({ username:  username})
        res.json(user);
    });





    //view review
    app.get('/api/review/view', async function (req, res, next) {
        const user = await User.findOne({_id: req.query.userId});
        const reviews = await Review.find({user: req.query.userId}).populate({
            path: 'restaurant',
            model: 'Restaurant',
            select: 'name -_id'
        }).sort([['creationTime', -1]]);
        res.status(200).json({reviews});
    });



    // edit review
    app.post('/api/review/edit', upload.single('picture'), async function (req, res, next) {
        const {reviewId, bathroomQuality, staffKindness, cleanliness, driveThruQuality, deliverySpeed, foodQuality} = req.body;
        const review = await Review.findOne({_id: reviewId}).populate({
            path: 'user',
            model: 'User',
            select: 'name -_id' 
        })
        if (review.user.username != req.authenticatedUser) 
            next('Authorization error!');
        else{
            review.bathroomQuality = bathroomQuality;
            review.staffKindness = staffKindness;
            review.cleanliness = cleanliness;
            review.driveThruQuality = driveThruQuality;
            review.deliverySpeed = deliverySpeed;
            review.foodQuality = foodQuality;
            review.picture = req.file ? {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype} : null;
            await review.save();
            res.status(200).json({});
        }
    });

    app.get('/api/review/delete', async function (req, res, next) {
        const {id} = req.body;
        const review = await Review.findOne({_id: id}).populate({
            path: 'user',
            model: 'User',
            select: 'name -_id' 
        })
        if (review.user.username != req.authenticatedUser) 
            next('Authorization error!');
        else{
            await Review.deleteOne({_id: id});
            res.status(200).json({});
        }
    });
};
