function prefixWithArticle(word) {
  var withPrefix = '';

  if (word.length > 0) {
    if (startsWithVowel(word)) {
      withPrefix = 'an ' + word;
    }
    else {
      withPrefix = 'a ' + word;      
    }
  }
  return withPrefix;
}

function startsWithVowel(word) {
  var finding = false;

  var lowercased = word.toLowerCase();
  var firstLetter = lowercased.charAt(0);

  if (['a', 'e', 'i', 'o', 'u'].indexOf(firstLetter) !== -1 &&
    lowercased.substr(0, 2) !== 'eu' &&
    lowercased.substr(0, 3) !== 'one') {

    finding = true;
  }

  return finding;
}

module.exports = prefixWithArticle;
