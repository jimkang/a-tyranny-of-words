var config = require('./config/config');
var createCollectivizer = require('collectivizer');
var canonicalizer = require('canonicalizer');
var prefixWithArticle = require('./prefix-with-article');
var sortRankKeys = require('./sort-rank-keys');
var pickFirstUnusedCollectiveNoun = require('./pick-first-unused-collective-noun');

var collectivizer = createCollectivizer({
  wordnikAPIKey: config.wordnikAPIKey
});

function getCollectiveNoun(opts, done) {
  var usedCollectivesDb;
  var noun;

  if (opts) {
    usedCollectivesDb = opts.usedCollectivesDb;
    noun = opts.noun;
  }

  collectivizer.collectivize(noun, pickFromResults);

  function pickFromResults(error, collectiveNounsByRank) {
    if (error) {
      done(error);
    }
    else {
      console.log(
        'Potential collective nouns by rank:',
        JSON.stringify(collectiveNounsByRank, null, '  ')
      );

      pickFirstUnusedCollectiveNoun(
        usedCollectivesDb, collectiveNounsByRank, packageResult
      );
    }
  }

  function packageResult(error, collectiveNoun) {
    if (error) {
      done(error);
    }
    else {
      var forms = canonicalizer.getSingularAndPluralForms(noun);
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

      usedCollectivesDb.put(collectiveNoun, forms[0], saveDone);

      function saveDone(error) {
        if (!error) {
          console.log('Saved collective noun', collectiveNoun, 'for', forms[0]);
        }
        done(error, result);
      }
    }
  }
}

function capitalizeFirstLetter(phrase) {
  var capitalized = '';
  if (phrase.length > 0) {
    capitalized = phrase.charAt(0).toUpperCase() + phrase.substr(1);
  }
  return capitalized;
}

module.exports = getCollectiveNoun;
