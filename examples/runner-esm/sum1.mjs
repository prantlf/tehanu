import tehanu from 'tehanu'
import assert from 'assert'
import sum from '../lib/sum.mjs'

const test = tehanu('sum1')

test('one number', () => assert.equal(sum(1), 1))
