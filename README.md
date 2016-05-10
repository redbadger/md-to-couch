# md-to-couch

Converts a folder of markdown files into CouchDB compatible JSON.

## How to use

`npm i md-to-couch`

    import * as mdToCouch from "md-to-couch";
    const couchJson = mdToCouch({
        dirname: __dirname,
        parseDate: true
        });

## Options

* `dirname` String: path to the list of markdown files. Your files must have `.md` extension. They can have front matter YAML, which will also be parsed.
* `parseDate` Boolean: enable parsing of filenames for potential date and time. Often markdown files would include datetime info which can be useful to parse automatically.

## Batch import documents into CouchDB

You can use the resulting JSON to batch import documents into CouchDB. Let's say we have CouchDB running on localhost. To do that you can send POST request to `http://127.0.0.1:5984/[db_name]/_bulk_docs` with the body containing resulting JSON.


