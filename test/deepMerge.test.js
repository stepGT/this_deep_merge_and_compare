const expect = require('chai').expect;
const deepMerge = require('../src/deepMerge');

describe('Deep Merge test', () => {
  it('1. Expects 1 and {} to be {}', () => {
    expect(deepMerge(1, {})).to.deep.equal({});
  });

  it('2. Expects {} and [] to be []', () => {
    expect(deepMerge({}, [])).to.deep.equal([]);
  });

  it('3. Expects {} and null to be null', () => {
    expect(deepMerge({}, null)).to.equal(null);
  });
});
