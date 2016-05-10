"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // This script will take all .md files in the given directory
// and convert them into a JSON object, ready to be imported into
// CouchDB.

// Front matter will be included as well.

// Example output
//
// {
//   "docs": [
//       {"_id": "0", "integer": 0, "string": "0"},
//       {"_id": "1", "integer": 1, "string": "1"},
//       {"_id": "2", "integer": 2, "string": "2"}
//   ]
// }

var _markdownParse = require("markdown-parse");

var mdparser = _interopRequireWildcard(_markdownParse);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _nodeUuid = require("node-uuid");

var uuid = _interopRequireWildcard(_nodeUuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fileList = [];

function readFiles(fileList, dirname) {
  var docList = [];
  fileList.forEach(function (filename) {
    var content = fs.readFileSync(dirname + '/' + filename, 'utf-8');
    mdparser.default(content, function (err, result) {
      docList.push(_extends({
        _id: uuid.v1(),
        filename: filename
      }, result));
    });
  });
  return { docs: docList };
};

function mdToCouchJson(dirname) {
  try {
    var _fileList = fs.readdirSync(dirname);
    var mdList = _fileList.filter(function (item) {
      return (/\.md$/.test(item)
      );
    });
    return readFiles(mdList, dirname);
  } catch (e) {
    console.log(e);
  }
}

module.exports.default = function (dirname) {
  if (!dirname) {
    return new Error('Path is not provided');
  } else {
    return mdToCouchJson(dirname);
  }
};
