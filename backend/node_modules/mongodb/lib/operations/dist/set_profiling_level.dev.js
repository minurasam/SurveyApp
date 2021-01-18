'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CommandOperation = require('./command');

var levelValues = new Set(['off', 'slow_only', 'all']);

var SetProfilingLevelOperation =
/*#__PURE__*/
function (_CommandOperation) {
  _inherits(SetProfilingLevelOperation, _CommandOperation);

  function SetProfilingLevelOperation(db, level, options) {
    var _this;

    _classCallCheck(this, SetProfilingLevelOperation);

    var profile = 0;

    if (level === 'off') {
      profile = 0;
    } else if (level === 'slow_only') {
      profile = 1;
    } else if (level === 'all') {
      profile = 2;
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SetProfilingLevelOperation).call(this, db, options));
    _this.level = level;
    _this.profile = profile;
    return _this;
  }

  _createClass(SetProfilingLevelOperation, [{
    key: "_buildCommand",
    value: function _buildCommand() {
      var profile = this.profile; // Set up the profile number

      var command = {
        profile: profile
      };
      return command;
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      var level = this.level;

      if (!levelValues.has(level)) {
        return callback(new Error('Error: illegal profiling level value ' + level));
      }

      _get(_getPrototypeOf(SetProfilingLevelOperation.prototype), "execute", this).call(this, function (err, doc) {
        if (err == null && doc.ok === 1) return callback(null, level);
        return err != null ? callback(err, null) : callback(new Error('Error with profile command'), null);
      });
    }
  }]);

  return SetProfilingLevelOperation;
}(CommandOperation);

module.exports = SetProfilingLevelOperation;