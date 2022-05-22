import test from 'tehanu/suite'
import { equal } from 'tehanu-teas'
import sum from '../lib/sum.mjs'

test('two numbers', () => equal(sum(1, 2), 3))
test('one number', () => equal(sum(1), 1))
