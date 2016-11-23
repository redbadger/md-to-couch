"use strict";

var _markdownParse = require("markdown-parse");

var mdparser = _interopRequireWildcard(_markdownParse);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _nodeUuid = require("uuid");

var uuid = _interopRequireWildcard(_nodeUuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Using old school require because of https://github.com/moment/moment/issues/2608
var moment = require('moment'); // This script will take all .md files in the given directory
// and convert them into a JSON object, ready to be imported into
// CouchDB.

// Front matter will be included as well.

// Example output
//
// {
//   "docs": [
//     {
//       "_id": "55d3a8b0-169d-11e6-aca2-f711d4732412",
//       "filename": "2012-06-07-microsoft-bizspark-european-summit.html.md",
//       "attributes": {
//         "title": "Microsoft BizSpark European Summit"
//       },
//       "body": "",
//       "datetime": {
//         "locale": "Thu Jun 07 2012 00:00:00 GMT+0100",
//         "iso": "2012-06-07T12:00:00.000Z"
//       }
//     }
//   ]
// }

var fileList = [];

function readFiles(fileList, dirname, parseDate) {
  var docList = [];
  fileList.forEach(function (filename) {
    var content = fs.readFileSync(dirname + '/' + filename, 'utf-8');
    mdparser.default(content, function (err, result) {
      var newDoc = {
        _id: uuid.v1(),
        filename: filename,
        attributes: result.attributes,
        body: result.body,
        html: result.html
      };

      if (parseDate) {
        var r = /\d\d\d\d-\d\d-\d\d/g;
        var fileDate = moment(r.exec(filename)[0] + ' 12Z');
        newDoc.datetime = {
          locale: fileDate.toLocaleString(),
          iso: fileDate.toISOString(),
          date: fileDate.format('DD'),
          monthSym: fileDate.format('MMM'),
          month: fileDate.format('MM'),
          year: fileDate.format('YYYY')
        };
      }

      docList.push(newDoc);
    });
  });
  return { docs: docList };
};

function mdToCouchJson(dirname, parseDate) {
  try {
    var _fileList = fs.readdirSync(dirname);
    var mdList = _fileList.filter(function (item) {
      return (/\.md$/.test(item)
      );
    });
    return readFiles(mdList, dirname, parseDate);
  } catch (e) {
    console.log(e);
  }
}

module.exports.default = function (options) {
  if (options === undefined || !options.hasOwnProperty('dirname')) {
    return new Error('Path is not provided');
  } else {
    return mdToCouchJson(options.dirname, options.parseDate);
  }
};
