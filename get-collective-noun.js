var config = require('./config');
var createCollectivizer = require('collectivizer');
var canonicalizer = require('canonicalizer');
var prefixWithArticle = require('./prefix-with-article');

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
      console.log(
        'Potential collective nouns by rank:',
        JSON.stringify(collectiveNounsByRank, null, '  ')
      );

      var collectiveNoun = collectiveNounsByRank[ranks[0]];
      var collectiveWithArticle = prefixWithArticle(collectiveNoun);
      var collectiveWithArticleCapitalized =
        capitalizeFirstLetter(collectiveWithArticle);

      var result = {
        singular: forms[0],
        plural: forms[1],
        collective: collectiveNoun,
        collectiveWithArticle: prefixWithArticle(collectiveNoun),
        collectiveWithArticleCapitalized: collectiveWithArticleCapitalized
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

function capitalizeFirstLetter(phrase) {
  var capitalized = '';
  if (phrase.length > 0) {
    capitalized = phrase.charAt(0).toUpperCase() + phrase.substr(1);
  }
  return capitalized;
}

module.exports = getRandomCollectiveNoun;
