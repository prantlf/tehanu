import test from './node_modules/tehanu/dist/suite.min.mjs?name=sum'
import './node_modules/tehanu-repo-tape/dist/index.min.mjs'
import { equal } from './node_modules/tehanu-teas/dist/index.min.mjs'
import sum from './sum.mjs'

test('one number', () => equal(sum(1), 1))
test('two numbers', () => equal(sum(1, 2), 3))
