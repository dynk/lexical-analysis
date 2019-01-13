
const LexicalsModel = require('../models/lexicals');
const logger =  require('../utils/logger');

const  predefinedLexicals = [
  {
    value: 'to'
  },
  {
    value: 'got'
  },
  {
    value: 'is'
  },
  {
    value: 'have'
  },
  {
    value: 'and'
  },
  {
    value: 'although'
  },
  {
    value: 'or'
  },
  {
    value: 'that'
  },
  {
    value: 'when'
  },
  {
    value: 'while'
  },
  {
    value: 'a'
  },
  {
    value: 'more'
  },
  {
    value: 'much'
  },
  {
    value: 'neither'
  },
  {
    value: 'my'
  },
  {
    value: 'that'
  },
  {
    value: 'the'
  },
  {
    value: 'as'
  },
  {
    value: 'no'
  },
  {
    value: 'nor'
  },
  {
    value: 'not'
  },
  {
    value: 'at'
  },
  {
    value: 'between'
  },
  {
    value: 'in'
  },
  {
    value: 'of'
  },
  {
    value: 'without'
  },
  {
    value: 'i'
  },
  {
    value: 'you'
  },
  {
    value: 'he'
  },
  {
    value: 'she'
  },
  {
    value: 'it'
  },
  {
    value: 'we'
  },
  {
    value: 'they'
  },
  {
    value: 'anybody'
  },
  {
    value: 'one'
  }
];

function get() {
  return LexicalsModel.find();
}


async function initialize(){
  const lexicals = await get();
  if(!lexicals || !lexicals.length) {
    return LexicalsModel.insertMany(predefinedLexicals).catch((e) => {
      logger.error('First population failed', e);
      return Promise.resolve();
    });
  }
  return Promise.resolve();
}


module.exports = {
  get,
  initialize
};