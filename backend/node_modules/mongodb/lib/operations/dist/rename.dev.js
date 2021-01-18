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

var applyWriteConcern = require('../utils').applyWriteConcern;

var checkCollectionName = require('../utils').checkCollectionName;

var executeDbAdminCommand = require('./db_ops').executeDbAdminCommand;

var handleCallback = require('../utils').handleCallback;

var loadCollection = require('../dynamic_loaders').loadCollection;

var toError = require('../utils').toError;

var RenameOperation =
/*#__PURE__*/
function (_OperationBase) {
  _inherits(RenameOperation, _OperationBase);

  function RenameOperation(collection, newName, options) {
    var _this;

    _classCallCheck(this, RenameOperation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RenameOperation).call(this, options));
    _this.collection = collection;
    _this.newName = newName;
    return _this;
  }

  _createClass(RenameOperation, [{
    key: "execute",
    value: function execute(callback) {
      var coll = this.collection;
      var newName = this.newName;
      var options = this.options;
      var Collection = loadCollection(); // Check the collection name

      checkCollectionName(newName); // Build the command

      var renameCollection = coll.namespace;
      var toCollection = coll.s.namespace.withCollection(newName).toString();
      var dropTarget = typeof options.dropTarget === 'boolean' ? options.dropTarget : false;
      var cmd = {
        renameCollection: renameCollection,
        to: toCollection,
        dropTarget: dropTarget
      }; // Decorate command with writeConcern if supported

      applyWriteConcern(cmd, {
        db: coll.s.db,
        collection: coll
      }, options); // Execute against admin

      executeDbAdminCommand(coll.s.db.admin().s.db, cmd, options, function (err, doc) {
        if (err) return handleCallback(callback, err, null); // We have an error

        if (doc.errmsg) return handleCallback(callback, toError(doc), null);

        try {
          return handleCallback(callback, null, new Collection(coll.s.db, coll.s.topology, coll.s.namespace.db, newName, coll.s.pkFactory, coll.s.options));
        } catch (err) {
          return handleCallback(callback, toError(err), null);
        }
      });
    }
  }]);

  return RenameOperation;
}(OperationBase);

module.exports = RenameOperation;