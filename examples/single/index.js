const test = require('tehanu')('sum'),
      { equal } = require('assert'),
      sum = require('../lib/sum.cjs')

test('two numbers', () => equal(sum(1, 2), 3))
test('one number', () => equal(sum(1), 1))
