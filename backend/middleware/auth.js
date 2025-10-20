const HttpError = require('../utils/HttpError');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return next(new HttpError('Missing Token', 401));

    next();
  } catch (error) {
    next(new HttpError('Invalid Token : ' + error.message, 403));
  }
};