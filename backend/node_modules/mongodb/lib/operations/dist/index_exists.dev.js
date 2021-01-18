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

var OperationBase = require('./operation').OperationBase;

var handleCallback = require('../utils').handleCallback;

var indexInformationDb = require('./db_ops').indexInformation;

var IndexExistsOperation =
/*#__PURE__*/
function (_OperationBase) {
  _inherits(IndexExistsOperation, _OperationBase);

  function IndexExistsOperation(collection, indexes, options) {
    var _this;

    _classCallCheck(this, IndexExistsOperation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IndexExistsOperation).call(this, options));
    _this.collection = collection;
    _this.indexes = indexes;
    return _this;
  }

  _createClass(IndexExistsOperation, [{
    key: "execute",
    value: function execute(callback) {
      var coll = this.collection;
      var indexes = this.indexes;
      var options = this.options;
      indexInformationDb(coll.s.db, coll.collectionName, options, function (err, indexInformation) {
        // If we have an error return
        if (err != null) return handleCallback(callback, err, null); // Let's check for the index names

        if (!Array.isArray(indexes)) return handleCallback(callback, null, indexInformation[indexes] != null); // Check in list of indexes

        for (var i = 0; i < indexes.length; i++) {
          if (indexInformation[indexes[i]] == null) {
            return handleCallback(callback, null, false);
          }
        } // All keys found return true


        return handleCallback(callback, null, true);
      });
    }
  }]);

  return IndexExistsOperation;
}(OperationBase);

module.exports = IndexExistsOperation;