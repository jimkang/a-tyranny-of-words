var test = require('tape');
var getCollectiveNoun = require('../../get-collective-noun');
var rimraf = require('rimraf');
var level = require('level');

// Note: This test runs live against the Internet and is slow.

test('Basic test', function basicTest(t) {
  t.plan(6);

  rimraf.sync('test.db');
  var testDb = level('integration-test.db');

  var opts = {
    noun: 'cherry',
    usedCollectivesDb: testDb
  };

  getCollectiveNoun(opts, checkResult)

  function checkResult(error, collectiveNounPack) {
    t.ok(!error, 'Does not return an error.');
    t.equal(collectiveNounPack.singular, 'cherry');
    t.equal(collectiveNounPack.plural, 'cherries');
    t.equal(collectiveNounPack.collective, 'bowl');
    t.equal(collectiveNounPack.collectiveWithArticle, 'a bowl');
    t.equal(collectiveNounPack.collectiveWithArticleCapitalized, 'A bowl');
  }
});
