import test from '../node_modules/tehanu/dist/suite.min.mjs?name=sum'
import 'tehanu-repo-tape/dist/index.min'
import { equal } from 'tehanu-teas/dist/index.min'
import sum from './sum.mjs'

test('one number', () => equal(sum(1), 1))
test('two numbers', () => equal(sum(1, 2), 3))
