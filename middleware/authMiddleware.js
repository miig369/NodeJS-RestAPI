import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// check if token exists and verify token
// when a user logs in there are granted a token

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    // check if token start with bearer and a space
    // if token exists match it to the user
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('Token trace : ' + req.headers.authorization);

    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log('decoded trace: ' + decoded);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  } else if (!token) {
    res.status(401);
    throw new Error('Not authorised, no token');
  }
});

export default protect;
