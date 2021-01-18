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

var BulkWriteOperation = require('./bulk_write');

var MongoError = require('../core').MongoError;

var prepareDocs = require('./common_functions').prepareDocs;

var InsertManyOperation =
/*#__PURE__*/
function (_OperationBase) {
  _inherits(InsertManyOperation, _OperationBase);

  function InsertManyOperation(collection, docs, options) {
    var _this;

    _classCallCheck(this, InsertManyOperation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InsertManyOperation).call(this, options));
    _this.collection = collection;
    _this.docs = docs;
    return _this;
  }

  _createClass(InsertManyOperation, [{
    key: "execute",
    value: function execute(callback) {
      var coll = this.collection;
      var docs = this.docs;
      var options = this.options;

      if (!Array.isArray(docs)) {
        return callback(MongoError.create({
          message: 'docs parameter must be an array of documents',
          driver: true
        }));
      } // If keep going set unordered


      options['serializeFunctions'] = options['serializeFunctions'] || coll.s.serializeFunctions;
      docs = prepareDocs(coll, docs, options); // Generate the bulk write operations

      var operations = [{
        insertMany: docs
      }];
      var bulkWriteOperation = new BulkWriteOperation(coll, operations, options);
      bulkWriteOperation.execute(function (err, result) {
        if (err) return callback(err, null);
        callback(null, mapInsertManyResults(docs, result));
      });
    }
  }]);

  return InsertManyOperation;
}(OperationBase);

function mapInsertManyResults(docs, r) {
  var finalResult = {
    result: {
      ok: 1,
      n: r.insertedCount
    },
    ops: docs,
    insertedCount: r.insertedCount,
    insertedIds: r.insertedIds
  };

  if (r.getLastOp()) {
    finalResult.result.opTime = r.getLastOp();
  }

  return finalResult;
}

module.exports = InsertManyOperation;