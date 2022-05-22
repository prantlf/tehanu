import * as tape from 'tehanu-repo-tape'
import { check, start } from './support.mjs'
import { default as suite, run, get, set } from '../lib/index.mjs'
import { strictEqual } from 'assert'

const reporter = {
    start() {}, startSuite() {}, ok() {}, fail() {}, bail() {}, skip() {},
    endSuite() {}, end() {}
  }

check(suite, 'get and set configuration', async function() {
  strictEqual(get('test'), undefined)
  set('test', 42)
  strictEqual(get('test'), 42)
  set({ test2: 43 })
  strictEqual(get('test'), 42)
  strictEqual(get('test2'), 43)
  set({ test2: 43 }, true)
  strictEqual(get('test'), undefined)
  strictEqual(get('test2'), 43)
  set('test2', undefined)
  strictEqual(get('test2'), undefined)
  await run()
})

check(suite, 'run empty', async function() {
  await run()
})

check(suite, 'test', async function(test) {
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 2 &&
              this.calls[0] === 1 && this.calls[1] === 2)
})

check(suite, 'only', async function(test) {
  test('1', () => this.calls.push(1))
  test.only('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 1 && this.calls[0] === 2)
})

check(suite, 'skip', async function(test) {
  test('1', () => this.calls.push(1))
  test.skip('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 1 && this.calls[0] === 1)
})

check(suite, 'parallel', async function(test) {
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter, parallel: true })
  this.assert(result && this.calls.length === 2 || this.calls[0] === 1 &&
              this.calls[0] === 2 || this.calls[1] === 1 && this.calls[1] === 2)
})

check(suite, 'parallel suites', async function(test) {
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter, parallelSuites: true })
  this.assert(result && this.calls.length === 2 || this.calls[0] === 1 &&
              this.calls[0] === 2 || this.calls[1] === 1 && this.calls[1] === 2)
})

check(suite, 'parallel suite', async function() {
  const test = suite({ parallel: true })
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 2 || this.calls[0] === 1 &&
              this.calls[0] === 2 || this.calls[1] === 1 && this.calls[1] === 2)
})

check(suite, 'before', async function(test) {
  test.before(() => this.calls.push(3))
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 3 &&
              this.calls[0] === 3 && this.calls[1] === 1 && this.calls[2] === 2)
}),

check(suite, 'after', async function(test) {
  test.after(() => this.calls.push(3))
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 3 &&
              this.calls[0] === 1 && this.calls[1] === 2 && this.calls[2] === 3)
})

check(suite, 'beforeEach', async function(test) {
  test.beforeEach(() => this.calls.push(3))
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 4 && this.calls[0] === 3 &&
              this.calls[1] === 1 && this.calls[2] === 3 && this.calls[3] === 2)
})

check(suite, 'afterEach', async function(test) {
  test.afterEach(() => this.calls.push(3))
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 4 && this.calls[0] === 1 &&
              this.calls[1] === 3 && this.calls[2] === 2 && this.calls[3] === 3)
})

check(suite, 'fail afterEach', async function(test) {
  test.afterEach(() => { throw new Error() })
  test('1', () => this.calls.push(1))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 1 && this.calls[0] === 1)
})

check(suite, 'fail', async function(test) {
  test('1', () => { throw new Error() })
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 1 && this.calls[0] === 2)
})

check(suite, 'fail and fail afterEach', async function(test) {
  test.afterEach(() => { throw new Error() })
  test('1', () => { throw new Error() })
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 1 && this.calls[0] === 2)
})

check(suite, 'bail', async function() {
  const test = suite({ bail: true })
  test('1', () => { throw new Error() })
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 0)
})

check(suite, 'bail from before', async function(test) {
  test.before(() => { throw new Error() })
  test('1', () => this.calls.push(1))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 0)
})

check(suite, 'prints an error', async function(test) {
  test('1', () => { throw new Error('test') })
  const error = console.error
  let message
  console.error = text => message = text
  await run()
  console.error = error
  this.assert(message.startsWith(`Failed: 1

Error: test
`))
})

start(tape)
