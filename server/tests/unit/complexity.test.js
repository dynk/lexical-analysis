const service = require('../../services/complexity');
const assert = require('assert');
const LexicalsModel = require('../../models/lexicals');
require('../../config/config');

const {
  loadFixture,
  dropDBs,
  closeDBConnection
} = require('../utils');
const {
  after,
  before
} = require('mocha');

describe('isValidText tests', () => {

  it('should accept regular text', () => {
    assert.equal(service.isValidText('aa'), true);
  });

  it('should reject null text', () => {
    assert.equal(service.isValidText(), false);
  });

  it('should reject texts greater than 1000', () => {
    const longText = 'x'.repeat(1001);
    assert.equal(service.isValidText(longText), false);
  });

  it('should accept long texts lesser than 1000', () => {
    const longText = 'x'.repeat(999);
    assert.equal(service.isValidText(longText), true);
  });
});

describe('breakInSentences tests', () => {

  it('should break one regular sentence text', () => {
    const oneSentenceText = 'Tim is walking.';
    const oneSentence = service.breakInSentences(oneSentenceText);
    const result = oneSentence.length;
    const expected = 1;
    assert.equal(result, expected);
  });

  it('should break two regular sentences text', () => {
    const oneSentenceText = 'Tim is walking. Ana is not.';
    const oneSentence = service.breakInSentences(oneSentenceText);
    const result = oneSentence.length;
    const expected = 2;
    assert.equal(result, expected);
  });

  it('should break one non regular sentence text', () => {
    const oneSentenceText = '...Tim is walking...';
    const oneSentence = service.breakInSentences(oneSentenceText);
    const result = oneSentence.length;
    const expected = 1;
    assert.equal(result, expected);
  });

  it('should break two non regular sentences text', () => {
    const oneSentenceText = 'Tim is walking... Ana is not...';
    const oneSentence = service.breakInSentences(oneSentenceText);
    const result = oneSentence.length;
    const expected = 2;
    assert.equal(result, expected);
  });

  it('should not break notvalid sentence text', () => {
    const oneSentenceText = '......';
    const oneSentence = service.breakInSentences(oneSentenceText);
    const result = oneSentence.length;
    const expected = 0;
    assert.equal(result, expected);
  });

});

describe('breakSentencesInWords tests', () => {

  it('should accept regular sentences', () => {
    const sentences = ['tim is walking', 'Ana is not though', 'yay'];
    const sentencesWords = service.breakSentencesInWords(sentences);
    const result = sentencesWords.map(s => s.length);
    const expected = [3, 4, 1];
    for (let i = 0; i < result.length; i++) {
      assert.equal(result[i], expected[i]);
    }
  });

});



describe('filterSentenceWords tests', () => {
  it('should filter non valid words', () => {
    const sentencesWord = [
      ['tim', '', 'walking']
    ];
    const filtered = service.filterSentenceWords(sentencesWord);
    const result = filtered[0].length;
    const expected = 2;
    assert.equal(result, expected);
  });
});

describe('isNWordsValid tests', () => {

  it('should accept regular sentences', () => {
    const sentencesWord = [
      ['tim', 'is', 'walking'],
      ['ana', 'is', 'not', 'though'],
      ['yay']
    ];
    const result = service.isNWordsValid(sentencesWord);
    assert.equal(result, true);
  });

  it('should not accept more than 100 words', () => {
    const longArray = [new Array(101).fill('word')];
    const result = service.isNWordsValid(longArray);
    assert.equal(result, false);
  });

  it('should accept less than 100 words', () => {
    const longArray = [new Array(99).fill('word')];
    const result = service.isNWordsValid(longArray);
    assert.equal(result, true);
  });


});

describe('main tests', () => {

  let lexicalsGlobal;
  before(async () => {
    await dropDBs();
    await loadFixture('lexicals');
    lexicalsGlobal = await LexicalsModel.findOne({});
    assert.notEqual(null, lexicalsGlobal);
    return Promise.resolve();
  });



  it('should make dictionary', async () => {
    const dictionary = await service.makeLexicalDictionaryFromDb();
    assert.notEqual(null, dictionary);
  });

  it('should calculate lexical', async () => {
    const dictionary = await service.makeLexicalDictionaryFromDb();
    const sentencesWords = [
      ['tim', 'is', 'walking'],
      ['ana', 'is', 'not', 'though'],
      ['yay']
    ];
    const result = await service.calculate({dictionary, sentencesWords});
    const expexted = {
      data: {
        sentence_ld: [ '0.67', '0.50', '1.00' ],
        overall_ld: '0.63'
      }
    };
    assert.deepEqual(expexted, result);
  });

  after(async () => {
    await dropDBs();
    await closeDBConnection('lexicals');
    return Promise.resolve();
  });


});

