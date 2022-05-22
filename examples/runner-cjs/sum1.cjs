const test = require('tehanu')('sum1'),
      { equal } = require('assert'),
      sum = require('../lib/sum.cjs')

test('one number', () => equal(sum(1), 1))
