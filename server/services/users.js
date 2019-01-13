
const UsersModel = require('../models/users');
const mongoose = require('mongoose');
const  {pick} = require('ramda');
const { findMissingFields } = require('../utils/utils');
const { PropertyRequiredError } = require('../utils/errors');


async function get() {
  try{
    const users = await UsersModel.find();
    return users;
  }catch(error){
    return handleUserError(error);
  }
}


async function getById(userId) {
  try{
    const user = await UsersModel.findById(userId);
    return user;
  }catch(error){
    return handleUserError(error);
  }
}

async function post(body = {}){

  const {  adminCode } = body;
  const requiredFields = ['email', 'name','password'];
  const missingFields = findMissingFields(body, requiredFields);
  if(missingFields && missingFields.length){
    throw new PropertyRequiredError(missingFields);
  }
  const userBody = pick(requiredFields,body);
  if(adminCode && (adminCode === 'secretadmincode123')){
    userBody.isAdmin = true;
  }
  try{
    const user = new UsersModel(userBody);
    await user.save();
    const authenticationToken = await user.generateAuthToken();
    return {user, authenticationToken};
  }catch(error){
    return handleUserError(error);
  }
}

async function login(req = {}){

  const requideFields = ['email', 'password'];
  const {body = {}} = req;
  try{
    const missingFields = findMissingFields(body, requideFields);
    if(missingFields && missingFields.length){
      throw new PropertyRequiredError(missingFields);
    }
    const userBody = pick(requideFields, req.body);
    const userModel = await UsersModel.findByCredentials(userBody.email, userBody.password);
    const authenticationToken = await userModel.generateAuthToken();
    const user = userModel.toObject();
    user.authenticationToken = authenticationToken;
    user.id = userModel.id;
    return {authenticationToken, user};
  }catch(err){
    return Promise.reject(err);
  }
}

function handleUserError(err) {
  if(err instanceof mongoose.CastError) {
    throw new RangeError(err.message);
  }
  if(err && err.message) {
    throw new RangeError(err.message);
  }
  throw err;
}

module.exports = {
  get,
  getById,
  post,
  login
};