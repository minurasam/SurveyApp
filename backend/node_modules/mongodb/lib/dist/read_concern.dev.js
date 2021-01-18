'use strict';
/**
 * The **ReadConcern** class is a class that represents a MongoDB ReadConcern.
 * @class
 * @property {string} level The read concern level
 * @see https://docs.mongodb.com/manual/reference/read-concern/index.html
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ReadConcern =
/*#__PURE__*/
function () {
  /**
   * Constructs a ReadConcern from the read concern properties.
   * @param {string} [level] The read concern level ({'local'|'available'|'majority'|'linearizable'|'snapshot'})
   */
  function ReadConcern(level) {
    _classCallCheck(this, ReadConcern);

    if (level != null) {
      this.level = level;
    }
  }
  /**
   * Construct a ReadConcern given an options object.
   *
   * @param {object} options The options object from which to extract the write concern.
   * @return {ReadConcern}
   */


  _createClass(ReadConcern, null, [{
    key: "fromOptions",
    value: function fromOptions(options) {
      if (options == null) {
        return;
      }

      if (options.readConcern) {
        if (options.readConcern instanceof ReadConcern) {
          return options.readConcern;
        }

        return new ReadConcern(options.readConcern.level);
      }

      if (options.level) {
        return new ReadConcern(options.level);
      }
    }
  }, {
    key: "MAJORITY",
    get: function get() {
      return 'majority';
    }
  }, {
    key: "AVAILABLE",
    get: function get() {
      return 'available';
    }
  }, {
    key: "LINEARIZABLE",
    get: function get() {
      return 'linearizable';
    }
  }, {
    key: "SNAPSHOT",
    get: function get() {
      return 'snapshot';
    }
  }]);

  return ReadConcern;
}();

module.exports = ReadConcern;