
const mdToCouch = require('../src/index.js').default;
const chai = require('chai');
const expect = chai.expect; // eslint-disable-line no-unused-vars
const should = chai.should(); // eslint-disable-line no-unused-vars
const assert = chai.assert;

describe('mdToCouch', () => {
  it('contains correct structure compatible with CouchDB', () => {
    expect(mdToCouch().docs).to.exist;
    expect(mdToCouch().docs).to.be.an('array');
  });

  it('compiles correctly with default argument', () => {
    assert.isDefined(mdToCouch());
    expect(mdToCouch().docs.length).to.equal(0);
  });

  it('works with custom directory argument', () => {
    assert.isDefined(mdToCouch(__dirname));
    expect(mdToCouch(__dirname).docs.length).to.equal(3);
  });
});
