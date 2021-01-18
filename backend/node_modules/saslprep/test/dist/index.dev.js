'use strict';

var saslprep = require('..');

var chr = String.fromCodePoint;
test('should work with liatin letters', function () {
  var str = 'user';
  expect(saslprep(str)).toEqual(str);
});
test('should work be case preserved', function () {
  var str = 'USER';
  expect(saslprep(str)).toEqual(str);
});
test('should work with high code points (> U+FFFF)', function () {
  var str = "\uD83D\uDE00";
  expect(saslprep(str, {
    allowUnassigned: true
  })).toEqual(str);
});
test('should remove `mapped to nothing` characters', function () {
  expect(saslprep("I\xADX")).toEqual('IX');
});
test('should replace `Non-ASCII space characters` with space', function () {
  expect(saslprep("a\xA0b")).toEqual("a b");
});
test('should normalize as NFKC', function () {
  expect(saslprep("\xAA")).toEqual('a');
  expect(saslprep("\u2168")).toEqual('IX');
});
test('should throws when prohibited characters', function () {
  // C.2.1 ASCII control characters
  expect(function () {
    return saslprep("a\x7Fb");
  }).toThrow(); // C.2.2 Non-ASCII control characters

  expect(function () {
    return saslprep("a\u06DDb");
  }).toThrow(); // C.3 Private use

  expect(function () {
    return saslprep("a\uE000b");
  }).toThrow(); // C.4 Non-character code points

  expect(function () {
    return saslprep("a".concat(chr(0x1fffe), "b"));
  }).toThrow(); // C.5 Surrogate codes

  expect(function () {
    return saslprep("a\uD800b");
  }).toThrow(); // C.6 Inappropriate for plain text

  expect(function () {
    return saslprep("a\uFFF9b");
  }).toThrow(); // C.7 Inappropriate for canonical representation

  expect(function () {
    return saslprep("a\u2FF0b");
  }).toThrow(); // C.8 Change display properties or are deprecated

  expect(function () {
    return saslprep("a\u200Eb");
  }).toThrow(); // C.9 Tagging characters

  expect(function () {
    return saslprep("a".concat(chr(0xe0001), "b"));
  }).toThrow();
});
test('should not containt RandALCat and LCat bidi', function () {
  expect(function () {
    return saslprep("a\u06DD\xAAb");
  }).toThrow();
});
test('RandALCat should be first and last', function () {
  expect(function () {
    return saslprep("\u06271\u0628");
  }).not.toThrow();
  expect(function () {
    return saslprep("\u06271");
  }).toThrow();
});
test('should handle unassigned code points', function () {
  expect(function () {
    return saslprep("a\u0487");
  }).toThrow();
  expect(function () {
    return saslprep("a\u0487", {
      allowUnassigned: true
    });
  }).not.toThrow();
});