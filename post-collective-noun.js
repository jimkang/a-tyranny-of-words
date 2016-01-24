var config = require('./config/config');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;
var Twit = require('twit');
var formatCollectiveNounSentence = require('./format-collective-noun-sentence');
var getCollectiveNoun = require('./get-collective-noun');
var createWordnok = require('wordnok').createWordnok;
var async = require('async');
var jsonfile = require('jsonfile');
var probable = require('probable');
var level = require('level');

var dryRun = false;
if (process.argv.length > 2) {
  dryRun = (process.argv[2].toLowerCase() == '--dry');
}

var twit = new Twit(config.twitter);

var wordnok = createWordnok({
  apiKey: config.wordnikAPIKey,
  logger: {
    log: function noOp() {}
  }
});

var templates = jsonfile.readFileSync(__dirname + '/templates.json');

var usedCollectivesDb = level(__dirname + '/data/used.db');

async.waterfall(
  [
    wordnok.getTopic,
    getOptsForCollectiveNoun,
    getCollectiveNoun,
    makeSentenceWithCollectiveInfo,
    postTweet
  ],
  wrapUp
);

function getOptsForCollectiveNoun(noun, done) {  
  var opts = {
    noun: noun,
    usedCollectivesDb: usedCollectivesDb
  };
  callBackOnNextTick(done, null, opts);
}

function makeSentenceWithCollectiveInfo(collectiveInfo, done) {
  var formatted = formatCollectiveNounSentence({
    collectiveNounInfo: collectiveInfo,
    template: probable.pickFromArray(templates)
  });
  callBackOnNextTick(done, null, formatted);
}

function postTweet(text, done) {
  if (dryRun) {
    console.log('Would have tweeted:', text);
    callBackOnNextTick(done);
  }
  else {
    var body = {
      status: text
    };
    twit.post('statuses/update', body, done);
  }
}

function wrapUp(error, data) {
  if (error) {
    console.log(error, error.stack);

    if (data) {
      console.log('data:', data);
    }
  }
}
