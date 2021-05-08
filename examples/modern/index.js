import sum from '../sum'
import { equal } from 'tehanu-teas'
import tehanu from 'tehanu'

const test = tehanu('sum')

test('two numbers', () => equal(sum(1, 2), 3))

test('one number', () => equal(sum(1), 1))
