const { responseErrorJson, responseJson } = require('../utils/controllers-response');
const service = require('../services/complexity');

async function post(req, res) {
  try{
    const { body, query } = req;
    const  { text } = body;
    const { mode } = query;
    const result = await service.calculateDensity(text);
    if (mode === 'verbose') {
      return responseJson(res, result);
    }
    delete result.data.sentence_ld;
    return responseJson(res, result);
  }catch(err) {
    return responseErrorJson(res, 'lexicals::post', err);
  }
}

module.exports = {
  post
};