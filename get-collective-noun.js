var config = require('./config');
var createCollectivizer = require('collectivizer');
var canonicalizer = require('canonicalizer');

var collectivizer = createCollectivizer({
  wordnikAPIKey: config.wordnikAPIKey
});

function getRandomCollectiveNoun(opts, done) {
  collectivizer.collectivize(opts.noun, pickFromResults);

  function pickFromResults(error, collectiveNounsByRank) {
    if (error) {
      done(error);
    }
    else {
      var ranks = Object.keys(collectiveNounsByRank).map(strToNumber).sort(desc);
      var forms = canonicalizer.getSingularAndPluralForms(opts.noun);
      // TODO: Pick a result that's not already used.
      var result = {
        singular: forms[0],
        plural: forms[1],
        collective: collectiveNounsByRank[ranks[0]]
      };
      done(error, result);
    }
  }
}

function strToNumber(s) {
  return +s;
}

function desc(a, b) {
  return a < b ? 1 : -1;
}

module.exports = getRandomCollectiveNoun;
