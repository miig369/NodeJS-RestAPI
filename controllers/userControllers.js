import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// controller for signing up a user
// Route - POST  /api/users
const signUpUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body; // destructure information from the request body

  //check if user already exists using email
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //create new user is user does exist
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  if (user) {
    res.status(201).json({
      // 201 status signifies that an action has be successfully undertaken
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // dont reveal password instead respond with token we generated
      token: generateToken(user.id),
    });
  } else {
    // for some reason if we are not able to create a new user, ie could not connect to the database
    // or the information supplied wasn't was not accurate we want to throw an error
    res.status(400);
    throw new Error('User could not be created');
  }
});

// login user
// Route - POST  api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find user in the database
  const user = await User.findOne({
    email,
  });

  if (user && user.matchPassword(password)) {
    return res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Incorrect email or password');
  }
});

// get all users
// Route - Get  /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// get user by id
// Route - GET  /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  //   const user = await User.findById(req.params.id);
  const user = await (
    await User.findById(req.params.id)
  ).isSelected('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//update user
// Route  PUT  /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } else {
    res.status(401);
    throw new Error('Could not update user');
  }
});

// delete user
// Route  DELETE  /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne();
    res.json({ message: 'User Deleted' });
  } else {
    res.status(401);
    throw new Error('User not deleted');
  }
});

export { signUpUser, loginUser, getUsers, getUserById, updateUser, deleteUser };
