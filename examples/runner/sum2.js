const test = require('tehanu')('sum2'),
      assert = require('assert'),
      sum = require('../sum')

test('two numbers', () => assert.equal(sum(1, 2), 3))
