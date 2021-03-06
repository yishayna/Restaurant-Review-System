const jwt = require('jsonwebtoken');
const {secret} = require('./secrets');

const checkToken = function (req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
    console.log("in check token and the token ")

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
          console.log("username is authorized");
        req.authenticatedUser = decoded.username;
        next();
      }
    });
  }
}

module.exports = {checkToken};