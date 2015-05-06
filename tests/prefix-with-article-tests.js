var test = require('tape');
var prefixWithArticle = require('../prefix-with-article');

test('Consonant', function consonant(t) {
  t.plan(1);

  t.equal(
    prefixWithArticle('word'),
    'a word',
    'Uses correct article for word starting with consonant.'
  );
});


test('Vowel', function vowel(t) {
  t.plan(1);

  t.equal(
    prefixWithArticle('abomination'),
    'an abomination',
    'Uses correct article for word starting with vowel.'
  );
});

test('Tricky vowel', function trickyVowel(t) {
  t.plan(1);

  t.equal(
    prefixWithArticle('euphemism'),
    'a euphemism',
    'Uses correct article for word starting with a vowel that sounds like a consonant.'
  );
});
