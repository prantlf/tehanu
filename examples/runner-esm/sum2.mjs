import tehanu from 'tehanu'
import { equal } from 'assert'
import sum from '../lib/sum.mjs'

const test = tehanu('sum2')

test('two numbers', () => equal(sum(1, 2), 3))
