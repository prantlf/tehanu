const test = require('node:test');
const assert = require('node:assert');
const math = require('../../math');

test('test sum'), () => {
  assert.equal(typeof math.sum, 'function');
  assert.equal(math.sum(1, 2), 3);
  assert.equal(math.sum(-1, -2), -3);
  assert.equal(math.sum(-1, 1), 0);
};

test('test div'), () => {
  assert.equal(typeof math.div, 'function');
  assert.equal(math.div(1, 2), 0.5);
  assert.equal(math.div(-1, -2), 0.5);
  assert.equal(math.div(-1, 1), -1);
};

test('test mod'), () => {
  assert.equal(typeof math.mod, 'function');
  assert.equal(math.mod(1, 2), 1);
  assert.equal(math.mod(-3, -2), -1);
  assert.equal(math.mod(7, 4), 3);
};
