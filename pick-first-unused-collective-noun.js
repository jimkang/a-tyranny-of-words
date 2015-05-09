var sortRankKeys = require('./sort-rank-keys');
var async = require('async');

function pickFirstUnusedCollectiveNoun(usedDb, collectivesByRank, done) {
  var ranks = sortRankKeys(Object.keys(collectivesByRank));
  async.detect(ranks, collectiveAtRankIsUnused, searchDone);

  function collectiveAtRankIsUnused(rank, checkDone) {
    var collectiveNoun = collectivesByRank[rank];
    usedDb.get(collectiveNoun, dbCouldNotFindRank);

    function dbCouldNotFindRank(error, value) {
      if (!error && value) {
        console.log('Found ' + collectiveNoun + ' already used for ' + value);
      }
      checkDone(error && error.type === 'NotFoundError');
    }
  }

  function searchDone(unusedRank) {
    var collective;
    if (!isNaN(unusedRank)) {
      collective = collectivesByRank[unusedRank];
      done(null, collective);
    }
  }
}

module.exports = pickFirstUnusedCollectiveNoun;
