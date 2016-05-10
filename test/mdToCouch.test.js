
const mdToCouch = require('../src/index.js').default;
const chai = require('chai');
const expect = chai.expect; // eslint-disable-line no-unused-vars
const assert = chai.assert;

describe('mdToCouch', () => {
  it('contains correct structure compatible with CouchDB', () => {
    expect(mdToCouch(__dirname).docs).to.exist;
    expect(mdToCouch(__dirname).docs).to.be.an('array');
  });

  it('returns error when folder is not specified', () => {
    assert.isDefined(mdToCouch());
    assert.typeOf(mdToCouch(), 'Error');
  });

  it('works with custom directory argument', () => {
    assert.isDefined(mdToCouch(__dirname));
    expect(mdToCouch(__dirname).docs.length).to.equal(3);
  });

  it('puts body of the markdown file into document', () => {
    expect(mdToCouch(__dirname).docs[0].body).to.exist;
  });

  it('puts name of the markdown file into document', () => {
    expect(mdToCouch(__dirname).docs[0].filename).to.exist;
    expect(mdToCouch(__dirname).docs[0].filename).to.equal('2012-06-07-microsoft-bizspark-european-summit.html.md');
  });
});
