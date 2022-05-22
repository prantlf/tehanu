const test = require('tehanu')('sum2'),
      assert = require('assert'),
      sum = require('../lib/sum.cjs')

test('two numbers', () => assert.equal(sum(1, 2), 3))
