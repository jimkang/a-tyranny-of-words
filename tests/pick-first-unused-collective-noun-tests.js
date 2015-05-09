var test = require('tape');
var pickFirstUnusedCollectiveNoun = require('../pick-first-unused-collective-noun');
var async = require('async');
var level = require('level');
var rimraf = require('rimraf');

test('Basic tests', function basic(t) {
  t.plan(2);

  rimraf.sync('test.db');
  var testDb = level('test.db');

  var collectivesForSingularsToSave = [
    {
      collective: 'murder',
      singular: 'crows'
    },
    {
      collective: 'scared',
      singular: 'furby'
    },
    {
      collective: 'misfortune',
      singular: 'juggalo'
    }
  ];

  var rankedCollectives =  {
    "0": "time",
    "1": "year",
    "2": "making",
    "3": "capital",
    "4": "page",
    "5": "fiction",
    "6": "nail",
    "7": "cart",
    "8": "shaft",
    "9": "xx",
    "10": "bronze",
    "11": "society",
    "12": "pierrot",
    "14": "scared",
    "15": "city",
    "16": "sultan",
    "17": "greece",
    "19": "rakyat",
    "20": "umrah",
    "22": "misfortune",
    "26": "murder"
  };
  
  async.each(collectivesForSingularsToSave, saveCollective, runPickFirstUnused);

  function saveCollective(collectiveInfo, done) {
    testDb.put(collectiveInfo.collective, collectiveInfo.singular, done);
  }

  function runPickFirstUnused(error) {
    if (error) {
      console.log(error);
      t.fail('Couldn\'t save collections to prep for tests.');
    }
    else {
      pickFirstUnusedCollectiveNoun(testDb, rankedCollectives, checkResult);
    }
  }

  function checkResult(error, collectiveNoun) {
    if (error) {
      console.log(error);
    }
    t.ok(!error, 'Does not return an error.');
    t.equal(collectiveNoun, 'umrah', 'Returns the first unused collective.');
  }
});
