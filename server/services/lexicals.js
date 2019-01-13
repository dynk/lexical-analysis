
const LexicalsModel = require('../models/lexicals');
const  {pick} = require('ramda');
const { findMissingFields } = require('../utils/utils');
const { PropertyRequiredError } = require('../utils/errors');

function get() {
  return LexicalsModel.find();
}


async function post(body = {}){

  const requiredFields = ['value'];
  const missingFields = findMissingFields(body, requiredFields);
  if(missingFields && missingFields.length){
    throw new PropertyRequiredError(missingFields);
  }
  const lexicalBody = pick(requiredFields,body);
  try{
    const lexical = new LexicalsModel(lexicalBody);
    return lexical.save();
  }catch(error){
    return Promise.reject(error);
  }
}


module.exports = {
  get,
  post
};