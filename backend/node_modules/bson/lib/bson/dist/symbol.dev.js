"use strict";

// Custom inspect property name / symbol.
var inspect = Buffer ? require('util').inspect.custom || 'inspect' : 'inspect';
/**
 * A class representation of the BSON Symbol type.
 *
 * @class
 * @deprecated
 * @param {string} value the string representing the symbol.
 * @return {Symbol}
 */

function _Symbol(value) {
  if (!(this instanceof _Symbol)) return new _Symbol(value);
  this._bsontype = 'Symbol';
  this.value = value;
}
/**
 * Access the wrapped string value.
 *
 * @method
 * @return {String} returns the wrapped string.
 */


_Symbol.prototype.valueOf = function () {
  return this.value;
};
/**
 * @ignore
 */


_Symbol.prototype.toString = function () {
  return this.value;
};
/**
 * @ignore
 */


_Symbol.prototype[inspect] = function () {
  return this.value;
};
/**
 * @ignore
 */


_Symbol.prototype.toJSON = function () {
  return this.value;
};

module.exports = _Symbol;
module.exports.Symbol = _Symbol;