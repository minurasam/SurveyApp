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

var Aspect = require('./operation').Aspect;

var CommandOperation = require('./command');

var defineAspects = require('./operation').defineAspects;

var handleCallback = require('../utils').handleCallback;

var DropOperation =
/*#__PURE__*/
function (_CommandOperation) {
  _inherits(DropOperation, _CommandOperation);

  function DropOperation(db, options) {
    _classCallCheck(this, DropOperation);

    var finalOptions = Object.assign({}, options, db.s.options);

    if (options.session) {
      finalOptions.session = options.session;
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(DropOperation).call(this, db, finalOptions));
  }

  _createClass(DropOperation, [{
    key: "execute",
    value: function execute(callback) {
      _get(_getPrototypeOf(DropOperation.prototype), "execute", this).call(this, function (err, result) {
        if (err) return handleCallback(callback, err);
        if (result.ok) return handleCallback(callback, null, true);
        handleCallback(callback, null, false);
      });
    }
  }]);

  return DropOperation;
}(CommandOperation);

defineAspects(DropOperation, Aspect.WRITE_OPERATION);

var DropCollectionOperation =
/*#__PURE__*/
function (_DropOperation) {
  _inherits(DropCollectionOperation, _DropOperation);

  function DropCollectionOperation(db, name, options) {
    var _this;

    _classCallCheck(this, DropCollectionOperation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropCollectionOperation).call(this, db, options));
    _this.name = name;
    _this.namespace = "".concat(db.namespace, ".").concat(name);
    return _this;
  }

  _createClass(DropCollectionOperation, [{
    key: "_buildCommand",
    value: function _buildCommand() {
      return {
        drop: this.name
      };
    }
  }]);

  return DropCollectionOperation;
}(DropOperation);

var DropDatabaseOperation =
/*#__PURE__*/
function (_DropOperation2) {
  _inherits(DropDatabaseOperation, _DropOperation2);

  function DropDatabaseOperation() {
    _classCallCheck(this, DropDatabaseOperation);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropDatabaseOperation).apply(this, arguments));
  }

  _createClass(DropDatabaseOperation, [{
    key: "_buildCommand",
    value: function _buildCommand() {
      return {
        dropDatabase: 1
      };
    }
  }]);

  return DropDatabaseOperation;
}(DropOperation);

module.exports = {
  DropOperation: DropOperation,
  DropCollectionOperation: DropCollectionOperation,
  DropDatabaseOperation: DropDatabaseOperation
};