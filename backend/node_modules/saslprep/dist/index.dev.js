'use strict';

var _require = require('./lib/memory-code-points'),
    unassigned_code_points = _require.unassigned_code_points,
    commonly_mapped_to_nothing = _require.commonly_mapped_to_nothing,
    non_ASCII_space_characters = _require.non_ASCII_space_characters,
    prohibited_characters = _require.prohibited_characters,
    bidirectional_r_al = _require.bidirectional_r_al,
    bidirectional_l = _require.bidirectional_l;

module.exports = saslprep; // 2.1.  Mapping

/**
 * non-ASCII space characters [StringPrep, C.1.2] that can be
 * mapped to SPACE (U+0020)
 */

var mapping2space = non_ASCII_space_characters;
/**
 * the "commonly mapped to nothing" characters [StringPrep, B.1]
 * that can be mapped to nothing.
 */

var mapping2nothing = commonly_mapped_to_nothing; // utils

var getCodePoint = function getCodePoint(character) {
  return character.codePointAt(0);
};

var first = function first(x) {
  return x[0];
};

var last = function last(x) {
  return x[x.length - 1];
};
/**
 * Convert provided string into an array of Unicode Code Points.
 * Based on https://stackoverflow.com/a/21409165/1556249
 * and https://www.npmjs.com/package/code-point-at.
 * @param {string} input
 * @returns {number[]}
 */


function toCodePoints(input) {
  var codepoints = [];
  var size = input.length;

  for (var i = 0; i < size; i += 1) {
    var before = input.charCodeAt(i);

    if (before >= 0xd800 && before <= 0xdbff && size > i + 1) {
      var next = input.charCodeAt(i + 1);

      if (next >= 0xdc00 && next <= 0xdfff) {
        codepoints.push((before - 0xd800) * 0x400 + next - 0xdc00 + 0x10000);
        i += 1;
        continue;
      }
    }

    codepoints.push(before);
  }

  return codepoints;
}
/**
 * SASLprep.
 * @param {string} input
 * @param {Object} opts
 * @param {boolean} opts.allowUnassigned
 * @returns {string}
 */


function saslprep(input) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof input !== 'string') {
    throw new TypeError('Expected string.');
  }

  if (input.length === 0) {
    return '';
  } // 1. Map


  var mapped_input = toCodePoints(input) // 1.1 mapping to space
  .map(function (character) {
    return mapping2space.get(character) ? 0x20 : character;
  }) // 1.2 mapping to nothing
  .filter(function (character) {
    return !mapping2nothing.get(character);
  }); // 2. Normalize

  var normalized_input = String.fromCodePoint.apply(null, mapped_input).normalize('NFKC');
  var normalized_map = toCodePoints(normalized_input); // 3. Prohibit

  var hasProhibited = normalized_map.some(function (character) {
    return prohibited_characters.get(character);
  });

  if (hasProhibited) {
    throw new Error('Prohibited character, see https://tools.ietf.org/html/rfc4013#section-2.3');
  } // Unassigned Code Points


  if (opts.allowUnassigned !== true) {
    var hasUnassigned = normalized_map.some(function (character) {
      return unassigned_code_points.get(character);
    });

    if (hasUnassigned) {
      throw new Error('Unassigned code point, see https://tools.ietf.org/html/rfc4013#section-2.5');
    }
  } // 4. check bidi


  var hasBidiRAL = normalized_map.some(function (character) {
    return bidirectional_r_al.get(character);
  });
  var hasBidiL = normalized_map.some(function (character) {
    return bidirectional_l.get(character);
  }); // 4.1 If a string contains any RandALCat character, the string MUST NOT
  // contain any LCat character.

  if (hasBidiRAL && hasBidiL) {
    throw new Error('String must not contain RandALCat and LCat at the same time,' + ' see https://tools.ietf.org/html/rfc3454#section-6');
  }
  /**
   * 4.2 If a string contains any RandALCat character, a RandALCat
   * character MUST be the first character of the string, and a
   * RandALCat character MUST be the last character of the string.
   */


  var isFirstBidiRAL = bidirectional_r_al.get(getCodePoint(first(normalized_input)));
  var isLastBidiRAL = bidirectional_r_al.get(getCodePoint(last(normalized_input)));

  if (hasBidiRAL && !(isFirstBidiRAL && isLastBidiRAL)) {
    throw new Error('Bidirectional RandALCat character must be the first and the last' + ' character of the string, see https://tools.ietf.org/html/rfc3454#section-6');
  }

  return normalized_input;
}