const test = require('tehanu')('sum2'),
      { equal } = require('assert'),
      sum = require('../lib/sum.cjs')

test('two numbers', () => equal(sum(1, 2), 3))
