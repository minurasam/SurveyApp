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

var MongoError = require('../core').MongoError;

var OperationBase = require('./operation').OperationBase;

var insertDocuments = require('./common_functions').insertDocuments;

var InsertOneOperation =
/*#__PURE__*/
function (_OperationBase) {
  _inherits(InsertOneOperation, _OperationBase);

  function InsertOneOperation(collection, doc, options) {
    var _this;

    _classCallCheck(this, InsertOneOperation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InsertOneOperation).call(this, options));
    _this.collection = collection;
    _this.doc = doc;
    return _this;
  }

  _createClass(InsertOneOperation, [{
    key: "execute",
    value: function execute(callback) {
      var coll = this.collection;
      var doc = this.doc;
      var options = this.options;

      if (Array.isArray(doc)) {
        return callback(MongoError.create({
          message: 'doc parameter must be an object',
          driver: true
        }));
      }

      insertDocuments(coll, [doc], options, function (err, r) {
        if (callback == null) return;
        if (err && callback) return callback(err); // Workaround for pre 2.6 servers

        if (r == null) return callback(null, {
          result: {
            ok: 1
          }
        }); // Add values to top level to ensure crud spec compatibility

        r.insertedCount = r.result.n;
        r.insertedId = doc._id;
        if (callback) callback(null, r);
      });
    }
  }]);

  return InsertOneOperation;
}(OperationBase);

module.exports = InsertOneOperation;