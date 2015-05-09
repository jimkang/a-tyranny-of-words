function strToNumber(s) {
  return +s;
}

function desc(a, b) {
  return a < b ? 1 : -1;
}

function sortRankKeys(rankKeys) {
  return rankKeys.map(strToNumber).sort(desc);
}

module.exports = sortRankKeys;
