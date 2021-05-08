const test = require('tehanu')('sum1'),
      assert = require('assert'),
      sum = require('../sum')

test('one number', () => assert.equal(sum(1), 1))
