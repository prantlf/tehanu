const test = require('tehanu')('sum-cjs'),
      { equal } = require('assert'),
      sum = require('./sum.cjs')

test('one number', () => equal(sum(1), 1))
test('two numbers', () => equal(sum(1, 2), 3))
