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

var CommandOperationV2 = require('./command_v2');

var Aspect = require('./operation').Aspect;

var defineAspects = require('./operation').defineAspects;

var maxWireVersion = require('../core/utils').maxWireVersion;

var CONSTANTS = require('../constants');

var LIST_COLLECTIONS_WIRE_VERSION = 3;

function listCollectionsTransforms(databaseName) {
  var matching = "".concat(databaseName, ".");
  return {
    doc: function doc(_doc) {
      var index = _doc.name.indexOf(matching); // Remove database name if available


      if (_doc.name && index === 0) {
        _doc.name = _doc.name.substr(index + matching.length);
      }

      return _doc;
    }
  };
}

var ListCollectionsOperation =
/*#__PURE__*/
function (_CommandOperationV) {
  _inherits(ListCollectionsOperation, _CommandOperationV);

  function ListCollectionsOperation(db, filter, options) {
    var _this;

    _classCallCheck(this, ListCollectionsOperation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListCollectionsOperation).call(this, db, options, {
      fullResponse: true
    }));
    _this.db = db;
    _this.filter = filter;
    _this.nameOnly = !!_this.options.nameOnly;

    if (typeof _this.options.batchSize === 'number') {
      _this.batchSize = _this.options.batchSize;
    }

    return _this;
  }

  _createClass(ListCollectionsOperation, [{
    key: "execute",
    value: function execute(server, callback) {
      if (maxWireVersion(server) < LIST_COLLECTIONS_WIRE_VERSION) {
        var filter = this.filter;
        var databaseName = this.db.s.namespace.db; // If we have legacy mode and have not provided a full db name filter it

        if (typeof filter.name === 'string' && !new RegExp('^' + databaseName + '\\.').test(filter.name)) {
          filter = Object.assign({}, filter);
          filter.name = this.db.s.namespace.withCollection(filter.name).toString();
        } // No filter, filter by current database


        if (filter == null) {
          filter.name = "/".concat(databaseName, "/");
        } // Rewrite the filter to use $and to filter out indexes


        if (filter.name) {
          filter = {
            $and: [{
              name: filter.name
            }, {
              name: /^((?!\$).)*$/
            }]
          };
        } else {
          filter = {
            name: /^((?!\$).)*$/
          };
        }

        var transforms = listCollectionsTransforms(databaseName);
        server.query("".concat(databaseName, ".").concat(CONSTANTS.SYSTEM_NAMESPACE_COLLECTION), {
          query: filter
        }, {
          batchSize: this.batchSize || 1000
        }, {}, function (err, result) {
          if (result && result.message && result.message.documents && Array.isArray(result.message.documents)) {
            result.message.documents = result.message.documents.map(transforms.doc);
          }

          callback(err, result);
        });
        return;
      }

      var command = {
        listCollections: 1,
        filter: this.filter,
        cursor: this.batchSize ? {
          batchSize: this.batchSize
        } : {},
        nameOnly: this.nameOnly
      };
      return _get(_getPrototypeOf(ListCollectionsOperation.prototype), "executeCommand", this).call(this, server, command, callback);
    }
  }]);

  return ListCollectionsOperation;
}(CommandOperationV2);

defineAspects(ListCollectionsOperation, [Aspect.READ_OPERATION, Aspect.RETRYABLE, Aspect.EXECUTE_WITH_SELECTION]);
module.exports = ListCollectionsOperation;