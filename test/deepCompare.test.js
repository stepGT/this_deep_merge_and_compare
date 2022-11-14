const expect = require('chai').expect;
const deepCompare = require('../src/deepCompare');

describe('Deep Compare test', () => {
  it('1. Expects numbers to be equal', () => {
    expect(deepCompare(1, 1)).to.equal(true);
  });

  it('2. Expects same types is not to be equal', () => {
    expect(deepCompare(1, 2)).to.equal(false);
  });

  it('3. Expects nulls to be equal', () => {
    expect(deepCompare(null, null)).to.equal(true);
  });

  it('4. Expects one null not to be equal object', () => {
    expect(deepCompare(null, {})).to.equal(false);
  });
});
