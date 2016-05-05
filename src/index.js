// This script will take all .md files in the given directory
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

import * as mdparser from "markdown-parse";
import * as fs from 'fs';
import * as uuid from "node-uuid";
import * as frontmatter from 'front-matter';

let fileList = [];

function readFiles(fileList, dirname) {
  let docList = [];
  fileList.forEach(function(filename) {
    console.log('Reading', dirname + '/' + filename);
    const content = fs.readFileSync(dirname + '/' + filename, 'utf-8');
    docList.push({
      _id: uuid.v1(),
      ...frontmatter.default(content).attributes
    });
  });
  return {docs: docList};
};

function mdToCouchJson(dirname) {
  console.log('Checking dirname', dirname);
  const fileList = fs.readdirSync(dirname);
  const mdList = fileList.filter(function(item) {
    return /\.md$/.test(item);
  });
  const finalResult = readFiles(mdList, dirname)
  console.log('finalResult' + JSON.stringify(finalResult));
  return finalResult;
}

module.exports.default = function(dirname = __dirname) {
  return mdToCouchJson(dirname);
};
