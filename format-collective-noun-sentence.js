var singularRegex = /@#\$%_s/g;
var pluralRegex = /@#\$%_p/g;
var collectiveRegex = /@#\$%_c/g;

function formatCollectiveNounSentence(opts) {
  if (!opts.template) {
    throw new Error('template not given to formatCollectiveNounSentence.');
  }
  if (!opts.collectiveNounInfo) {
    throw new Error(
      'collectiveNounInfo not given to formatCollectiveNounSentence.'
    );
  }

  var formatted = opts.template.replace(
    singularRegex, opts.collectiveNounInfo.singular
  );
  formatted = formatted.replace(
    pluralRegex, opts.collectiveNounInfo.plural
  );
  formatted = formatted.replace(
    collectiveRegex, opts.collectiveNounInfo.collective
  );

  return formatted;
}

module.exports = formatCollectiveNounSentence;
