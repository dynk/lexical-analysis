const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/users');
const { pick } = require('ramda');
const HttpStatus = require('http-status-codes');

async function get(req, res) {
  try{
    const users = await service.get();
    const fields = [
      'id',
      'name',
      'email'
    ];
    return responseJson(res, users.map(pick(fields)));
  }catch(err){
    return responseErrorJson(res, 'users::get', err);
  }
}


async function getById(req = {}, res) {
  try{
    const { userId } = req.params;
    const user = await service.getById(userId);
    if(!user)
      return responseJson(res, null, HttpStatus.NO_CONTENT);
    return responseJson(res, user);
  }catch(err){
    return responseErrorJson(res, 'users::getById', err);
  }
}

async function login(req, res){
  try{
    const {user ,authenticationToken} = await service.login(req);
    res.header('x-auth', authenticationToken);
    return responseJson(res, pick(['id', 'email', 'authenticationToken'], user));
  }catch(err) {
    return responseErrorJson(res, 'users::login', err);
  }
}

async function post(req, res) {
  try{
    const {user, authenticationToken} = await service.post(req.body);
    res.header('x-auth', authenticationToken);
    return responseJson(res, pick(['id', 'name', 'email'], user));
  }catch(err) {
    return responseErrorJson(res, 'users::post', err);
  }
}

module.exports = {
  get,
  getById,
  login,
  post
};