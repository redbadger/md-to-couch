# md-to-couch

Convert a folder of markdown files into CouchDB compatible JSON.

## How to use

`npm i md-to-couch`

    import * as mdToCouch from "md-to-couch";
    const couchJson = mdToCouch(__dirname);

`md-to-couch` accepts single argument with the path to the list of markdown files. Your files must have `.md` extension. They can have front matter YAML, which will also be parsed.

## Batch import documents into CouchDB

You can use the resulting JSON to batch import documents into CouchDB. Let's say we have CouchDB running on localhost. To do that you can send POST request to `http://127.0.0.1:5984/[db_name]/_bulk_docs` with the body containing resulting JSON.


