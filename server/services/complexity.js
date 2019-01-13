const LexicalsModel = require('../models/lexicals');

async function calculateDensity(text) {
  if (!isValidText(text)) {
    return;
  }
  const sentences = breakInSentences(text);
  const sentencesWords = breakSentencesInWords(sentences);
  const filteredSentenceWords = filterSentenceWords(sentencesWords);
  if (!isNWordsValid(filteredSentenceWords)) {
    return;
  }
  const dictionary = await makeLexicalDictionaryFromDb();
  return calculate({
    sentencesWords: filteredSentenceWords,
    dictionary
  });
}

function isValidText(text) {
  if (
    text &&
    typeof text === 'string' &&
    text.length < 1000
  ) {
    return true;
  }
  return false;
}

function isNWordsValid(sentencesWords) {
  const count = sentencesWords.reduce((acc, curr) => acc + curr.length, 0);
  if (count < 100) {
    return true;
  }
  return false;
}

function breakInSentences(text) {
  const sentencesDelimeter = {
    '.': true,
    '!': true,
    '?': true
  };
  const result = [];
  let nSentence = 0;
  for (const t of text) {
    if (sentencesDelimeter[t]) {
      if (result[nSentence]) {
        nSentence++;
      }
    } else {
      if (result[nSentence]) {
        result[nSentence] += t;
      } else {
        result[nSentence] = t;
      }
    }
  }
  return result;
}

function breakSentencesInWords(sentences) {
  const result = [];
  let nSentences = 0;
  for (const s of sentences) {
    result[nSentences] = s.split(' ');
    nSentences++;
  }
  return result;
}

function filterSentenceWords(sentencesWords) {
  const result = [];
  let nSentences = 0;
  for (const sentence of sentencesWords) {
    result[nSentences] = sentence.filter(s => s.length !== 0);
    nSentences++;
  }
  return result;
}

function calculate({sentencesWords, dictionary}) {
  const result = {
    data: {}
  };

  let totalLexicalWords = 0;
  let totalWords = 0;
  const calcPerSentence = [];
  for (const sentence of sentencesWords) {
    const lexicals = sentence.filter(s => dictionary[s]);
    const nL = lexicals.length;
    const nW = sentence.length;
    totalLexicalWords += nL;
    totalWords += nW;
    calcPerSentence.push(safeDivision(nL,nW));
  }
  result.data.sentence_ld = calcPerSentence;
  result.data.overall_ld = safeDivision(totalLexicalWords,totalWords);
  return result;

  function safeDivision(a,b) {
    if(b === 0){
      return 0;
    }
    return (a/b).toFixed(2);
  }

}

async function makeLexicalDictionaryFromDb() {
  const lexicalWords = await LexicalsModel.find();
  const dictionary = {};
  for(const l of lexicalWords) {
    dictionary[l.value] = true;
  }
  return dictionary;
}

module.exports = {
  breakInSentences,
  breakSentencesInWords,
  calculate,
  calculateDensity,
  filterSentenceWords,
  isValidText,
  isNWordsValid,
  makeLexicalDictionaryFromDb
};
