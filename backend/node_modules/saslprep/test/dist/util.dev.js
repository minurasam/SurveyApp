'use strict';

var _require = require('v8'),
    setFlagsFromString = _require.setFlagsFromString;

var _require2 = require('../lib/util'),
    range = _require2.range; // 984 by default.


setFlagsFromString('--stack_size=500');
test('should work', function () {
  var list = range(1, 3);
  expect(list).toEqual([1, 2, 3]);
});
test('should work for large ranges', function () {
  expect(function () {
    return range(1, 1e6);
  }).not.toThrow();
});