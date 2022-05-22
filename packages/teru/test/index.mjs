import test from 'tehanu/suite'
import { equal } from 'assert'
import sum from './sum.mjs'

test('one number', () => equal(sum(1), 1))
test('two numbers', () => equal(sum(1, 2), 3))
