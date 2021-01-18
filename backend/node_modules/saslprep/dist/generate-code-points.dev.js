'use strict';

var bitfield = require('sparse-bitfield');

var codePoints = require('./lib/code-points');

var unassigned_code_points = bitfield();
var commonly_mapped_to_nothing = bitfield();
var non_ascii_space_characters = bitfield();
var prohibited_characters = bitfield();
var bidirectional_r_al = bitfield();
var bidirectional_l = bitfield();
/**
 * Iterare over code points and
 * convert it into an buffer.
 * @param {bitfield} bits
 * @param {Array} src
 * @returns {Buffer}
 */

function traverse(bits, src) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = src.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var code = _step.value;
      bits.set(code, true);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var buffer = bits.toBuffer();
  return Buffer.concat([createSize(buffer), buffer]);
}
/**
 * @param {Buffer} buffer
 * @returns {Buffer}
 */


function createSize(buffer) {
  var buf = Buffer.alloc(4);
  buf.writeUInt32BE(buffer.length);
  return buf;
}

var memory = [];
memory.push(traverse(unassigned_code_points, codePoints.unassigned_code_points), traverse(commonly_mapped_to_nothing, codePoints.commonly_mapped_to_nothing), traverse(non_ascii_space_characters, codePoints.non_ASCII_space_characters), traverse(prohibited_characters, codePoints.prohibited_characters), traverse(bidirectional_r_al, codePoints.bidirectional_r_al), traverse(bidirectional_l, codePoints.bidirectional_l));
process.stdout.write(Buffer.concat(memory));