var test = require('tape');
var formatCollectiveNounSentence = require('../format-collective-noun-sentence');

test('Template', function templateTest(t) {
  t.plan(1);

  var formatted = formatCollectiveNounSentence({
    collectiveNounInfo: {
      singular: 'cherry',
      plural: 'cherries',
      collective: 'bowlful',
      collectiveWithArticle: 'a bowlful',
      collectiveWithArticleCapitalized: 'A bowlful',
    },
    template: 'The collective noun for @#$%_s is "@#$%_c"; ' +
      'many @#$%_p are called @#$%_a-c. @#$%_A-c of @#$%_p.'
  });

  t.equal(
    formatted,
    'The collective noun for cherry is "bowlful"; ' +
    'many cherries are called a bowlful. A bowlful of cherries.',
    'All placeholders are replaced correctly.'
  );
});
