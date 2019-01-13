const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/lexicals');
const { pick } = require('ramda');

async function get(req, res) {
  try{
    const lexicals = await service.get();
    const fields = ['value'];
    return responseJson(res, lexicals.map(pick(fields)));
  }catch(err){
    return responseErrorJson(res, 'lexicals::get', err);
  }
}


async function post(req, res) {
  try{
    const createdLexical = await service.post(req.body);
    return responseJson(res, pick(['id','value'], createdLexical));
  }catch(err) {
    return responseErrorJson(res, 'lexicals::post', err);
  }
}

module.exports = {
  get,
  post
};