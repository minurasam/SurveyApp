'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Aspect = require('./operation').Aspect;

var CommandOperation = require('./command');

var defineAspects = require('./operation').defineAspects;
/**
 * Get all the collection statistics.
 *
 * @class
 * @property {Collection} a Collection instance.
 * @property {object} [options] Optional settings. See Collection.prototype.stats for a list of options.
 */


var StatsOperation =
/*#__PURE__*/
function (_CommandOperation) {
  _inherits(StatsOperation, _CommandOperation);

  /**
   * Construct a Stats operation.
   *
   * @param {Collection} a Collection instance.
   * @param {object} [options] Optional settings. See Collection.prototype.stats for a list of options.
   */
  function StatsOperation(collection, options) {
    _classCallCheck(this, StatsOperation);

    return _possibleConstructorReturn(this, _getPrototypeOf(StatsOperation).call(this, collection.s.db, options, collection));
  }

  _createClass(StatsOperation, [{
    key: "_buildCommand",
    value: function _buildCommand() {
      var collection = this.collection;
      var options = this.options; // Build command object

      var command = {
        collStats: collection.collectionName
      }; // Check if we have the scale value

      if (options['scale'] != null) {
        command['scale'] = options['scale'];
      }

      return command;
    }
  }]);

  return StatsOperation;
}(CommandOperation);

defineAspects(StatsOperation, Aspect.READ_OPERATION);
module.exports = StatsOperation;