
const mdToCouch = require('../src/index.js').default;
const chai = require('chai');
const expect = chai.expect; // eslint-disable-line no-unused-vars
const should = chai.should(); // eslint-disable-line no-unused-vars
const assert = chai.assert;

describe('mdToCouch', () => {
  it('compiles correctly with default argument', () => {
    assert.isDefined(mdToCouch());
  });

  it('works with custom directory argument', () => {
    console.log('RESULT', mdToCouch(__dirname));
    assert.isDefined(mdToCouch(__dirname));
  });
});
