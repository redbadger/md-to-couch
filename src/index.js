// This script will take all .md files in the given directory
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

import * as mdparser from "markdown-parse";
import * as fs from 'fs';
import * as uuid from "node-uuid";

// Using old school require because of https://github.com/moment/moment/issues/2608
const moment = require('moment');

let fileList = [];

function readFiles(fileList, dirname, parseDate) {
  let docList = [];
  fileList.forEach(function(filename) {
    const content = fs.readFileSync(dirname + '/' + filename, 'utf-8');
    mdparser.default(content, function(err, result) {
      const newDoc = {
        _id: uuid.v1(),
        filename: filename,
        attributes: result.attributes,
        body: result.body,
        html: result.html
      };

      if(parseDate) {
        const r = /\d\d\d\d-\d\d-\d\d/g;
        let fileDate = moment(r.exec(filename)[0] + ' 12Z');
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
  return {docs: docList};
};

function mdToCouchJson(dirname, parseDate) {
  try {
    const fileList = fs.readdirSync(dirname);
    const mdList = fileList.filter(function(item) {
      return /\.md$/.test(item);
    });
    return readFiles(mdList, dirname, parseDate);
  } catch(e) {
    console.log(e);
  }
}

module.exports.default = function(options) {
  if(options === undefined || !options.hasOwnProperty('dirname')) {
    return new Error('Path is not provided');
  } else {
    return mdToCouchJson(options.dirname, options.parseDate);
  }
};
