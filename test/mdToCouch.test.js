
const mdToCouch = require('../src/index.js').default;
const chai = require('chai');
const expect = chai.expect; // eslint-disable-line no-unused-vars
const assert = chai.assert;
const jsonlint = require('jsonlint');

describe('mdToCouch', () => {
  it('contains correct structure compatible with CouchDB', () => {
    expect(mdToCouch({dirname: __dirname}).docs).to.exist;
    expect(mdToCouch({dirname: __dirname}).docs).to.be.an('array');
  });

  it('returns error when options are not specified', () => {
    assert.isDefined(mdToCouch());
    assert.typeOf(mdToCouch(), 'Error');
  });

  it('returns error when dirname option is not specified', () => {
    assert.typeOf(mdToCouch({a: true}), 'Error');
  });

  it('works with custom directory argument', () => {
    assert.isDefined(mdToCouch({dirname: __dirname}));
    expect(mdToCouch({dirname: __dirname}).docs.length).to.equal(3);
  });

  it('puts body of the markdown file into document', () => {
    expect(mdToCouch({dirname: __dirname}).docs[0].body).to.exist;
  });

  it('puts name of the markdown file into document', () => {
    expect(mdToCouch({dirname: __dirname}).docs[0].filename).to.exist;
    expect(mdToCouch({dirname: __dirname}).docs[0].filename).to.equal('2012-06-07-microsoft-bizspark-european-summit.html.md');
  });

  it('parses filename for date time when flag is specified', () => {
    expect(mdToCouch({dirname: __dirname, parseDate: true}).docs[0].datetime).to.exist;
    expect(mdToCouch({dirname: __dirname, parseDate: true}).docs[0].datetime.iso).to.exist;
    expect(mdToCouch({dirname: __dirname, parseDate: true}).docs[0].datetime.locale).to.exist;
  });

  it('adds formatted human readable date, month and year fields', () => {
    expect(mdToCouch({dirname: __dirname, parseDate: true}).docs[0].datetime.date).to.equal('07');
    expect(mdToCouch({dirname: __dirname, parseDate: true}).docs[0].datetime.month).to.equal('06');
    expect(mdToCouch({dirname: __dirname, parseDate: true}).docs[0].datetime.monthSym).to.equal('Jun');
    expect(mdToCouch({dirname: __dirname, parseDate: true}).docs[0].datetime.year).to.equal('2012');
  });

  it('escapes doublequote characters in generated html so that string is JSON compatible', () => {
    var html = mdToCouch({dirname: __dirname, parseDate: true, compileHtml: true}).docs[2].html;
    var htmlJson= JSON.stringify({a: html});
    expect(jsonlint.parse(htmlJson)).not.to.throw;
    expect(mdToCouch({dirname: __dirname, parseDate: true, compileHtml: true}).docs[0].html).to.exist;
  });

  it('sets iso date and time to the correct date parsed from filename, and time set to midday', () => {
    expect(mdToCouch({dirname: __dirname, parseDate: true}).docs[0].datetime.iso).to.equal('2012-06-07T12:00:00.000Z');
  })
});
