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

var applyRetryableWrites = require('../utils').applyRetryableWrites;

var applyWriteConcern = require('../utils').applyWriteConcern;

var MongoError = require('../core').MongoError;

var OperationBase = require('./operation').OperationBase;

var BulkWriteOperation =
/*#__PURE__*/
function (_OperationBase) {
  _inherits(BulkWriteOperation, _OperationBase);

  function BulkWriteOperation(collection, operations, options) {
    var _this;

    _classCallCheck(this, BulkWriteOperation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BulkWriteOperation).call(this, options));
    _this.collection = collection;
    _this.operations = operations;
    return _this;
  }

  _createClass(BulkWriteOperation, [{
    key: "execute",
    value: function execute(callback) {
      var coll = this.collection;
      var operations = this.operations;
      var options = this.options; // Add ignoreUndfined

      if (coll.s.options.ignoreUndefined) {
        options = Object.assign({}, options);
        options.ignoreUndefined = coll.s.options.ignoreUndefined;
      } // Create the bulk operation


      var bulk = options.ordered === true || options.ordered == null ? coll.initializeOrderedBulkOp(options) : coll.initializeUnorderedBulkOp(options); // Do we have a collation

      var collation = false; // for each op go through and add to the bulk

      try {
        for (var i = 0; i < operations.length; i++) {
          // Get the operation type
          var key = Object.keys(operations[i])[0]; // Check if we have a collation

          if (operations[i][key].collation) {
            collation = true;
          } // Pass to the raw bulk


          bulk.raw(operations[i]);
        }
      } catch (err) {
        return callback(err, null);
      } // Final options for retryable writes and write concern


      var finalOptions = Object.assign({}, options);
      finalOptions = applyRetryableWrites(finalOptions, coll.s.db);
      finalOptions = applyWriteConcern(finalOptions, {
        db: coll.s.db,
        collection: coll
      }, options);
      var writeCon = finalOptions.writeConcern ? finalOptions.writeConcern : {};
      var capabilities = coll.s.topology.capabilities(); // Did the user pass in a collation, check if our write server supports it

      if (collation && capabilities && !capabilities.commandsTakeCollation) {
        return callback(new MongoError('server/primary/mongos does not support collation'));
      } // Execute the bulk


      bulk.execute(writeCon, finalOptions, function (err, r) {
        // We have connection level error
        if (!r && err) {
          return callback(err, null);
        }

        r.insertedCount = r.nInserted;
        r.matchedCount = r.nMatched;
        r.modifiedCount = r.nModified || 0;
        r.deletedCount = r.nRemoved;
        r.upsertedCount = r.getUpsertedIds().length;
        r.upsertedIds = {};
        r.insertedIds = {}; // Update the n

        r.n = r.insertedCount; // Inserted documents

        var inserted = r.getInsertedIds(); // Map inserted ids

        for (var _i = 0; _i < inserted.length; _i++) {
          r.insertedIds[inserted[_i].index] = inserted[_i]._id;
        } // Upserted documents


        var upserted = r.getUpsertedIds(); // Map upserted ids

        for (var _i2 = 0; _i2 < upserted.length; _i2++) {
          r.upsertedIds[upserted[_i2].index] = upserted[_i2]._id;
        } // Return the results


        callback(null, r);
      });
    }
  }]);

  return BulkWriteOperation;
}(OperationBase);

module.exports = BulkWriteOperation;