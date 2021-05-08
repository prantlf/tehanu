const test = require('tehanu')('sum'),
      assert = require('assert'),
      sum = require('../sum')

test('two numbers', () => assert.equal(sum(1, 2), 3))

test('one number', () => assert.equal(sum(1), 1))
