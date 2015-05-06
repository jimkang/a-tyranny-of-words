var test = require('tape');
var getRandomCollectiveNoun = require('../get-collective-noun');

// Note: This test runs live against the Internet and is slow.

test('Basic test', function basicTest(t) {
  t.plan(6);

  var opts = {
    noun: 'cherry',
    dbPath: 'db-not-used-yet'
  };

  getRandomCollectiveNoun(opts, checkResult)

  function checkResult(error, collectiveNounPack) {
    t.ok(!error, 'Does not return an error.');
    t.equal(collectiveNounPack.singular, 'cherry');
    t.equal(collectiveNounPack.plural, 'cherries');
    t.equal(collectiveNounPack.collective, 'bowlful');
    t.equal(collectiveNounPack.collectiveWithArticle, 'a bowlful');
    t.equal(collectiveNounPack.collectiveWithArticleCapitalized, 'A bowlful');
  }
});
