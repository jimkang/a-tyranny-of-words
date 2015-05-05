var test = require('tape');
var formatCollectiveNounSentence = require('../format-collective-noun-sentence');

test('Template', function templateTest(t) {
  t.plan(1);

  var formatted = formatCollectiveNounSentence({
    collectiveNounInfo: {
      singular: 'cherry',
      plural: 'cherries',
      collective: 'bowlful'
    },
    template: 'The collective noun for @#$%_s is "@#$%_c"; many @#$%_p are called a "@#$%_c".'
  });

  t.equal(
    formatted,
    'The collective noun for cherry is "bowlful"; many cherries are called a "bowlful".',
    'All placeholders are replaced correctly.'
  );
});
