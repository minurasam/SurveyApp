'use strict';

var fs = require('fs');

var path = require('path');

var bitfield = require('sparse-bitfield');
/* eslint-disable-next-line security/detect-non-literal-fs-filename */


var memory = fs.readFileSync(path.resolve(__dirname, '../code-points.mem'));
var offset = 0;
/**
 * Loads each code points sequence from buffer.
 * @returns {bitfield}
 */

function read() {
  var size = memory.readUInt32BE(offset);
  offset += 4;
  var codepoints = memory.slice(offset, offset + size);
  offset += size;
  return bitfield({
    buffer: codepoints
  });
}

var unassigned_code_points = read();
var commonly_mapped_to_nothing = read();
var non_ASCII_space_characters = read();
var prohibited_characters = read();
var bidirectional_r_al = read();
var bidirectional_l = read();
module.exports = {
  unassigned_code_points: unassigned_code_points,
  commonly_mapped_to_nothing: commonly_mapped_to_nothing,
  non_ASCII_space_characters: non_ASCII_space_characters,
  prohibited_characters: prohibited_characters,
  bidirectional_r_al: bidirectional_r_al,
  bidirectional_l: bidirectional_l
};