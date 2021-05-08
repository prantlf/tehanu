const check = require('./check'),
      reporter = {
        start() {}, startSuite() {},
        ok() {}, fail() {}, bail() {}, skip() {},
        endSuite() {}, end() {}
      },
      suite = require('.'),
      { run } = suite

check('run empty', async function() {
  await run()
})

check('test', async function(test) {
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 2 &&
              this.calls[0] === 1 && this.calls[1] === 2)
})

check('only', async function(test) {
  test('1', () => this.calls.push(1))
  test.only('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 1 && this.calls[0] === 2)
})

check('skip', async function(test) {
  test('1', () => this.calls.push(1))
  test.skip('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 1 && this.calls[0] === 1)
})

check('parallel', async function(test) {
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter, parallel: true })
  this.assert(result && this.calls.length === 2 || this.calls[0] === 1 &&
              this.calls[0] === 2 || this.calls[1] === 1 && this.calls[1] === 2)
})

check('parallel suites', async function(test) {
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter, parallelSuites: true })
  this.assert(result && this.calls.length === 2 || this.calls[0] === 1 &&
              this.calls[0] === 2 || this.calls[1] === 1 && this.calls[1] === 2)
})

check('parallel suite', async function() {
  const test = suite({ parallel: true })
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 2 || this.calls[0] === 1 &&
              this.calls[0] === 2 || this.calls[1] === 1 && this.calls[1] === 2)
})

check('before', async function(test) {
  test.before(() => this.calls.push(3))
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 3 &&
              this.calls[0] === 3 && this.calls[1] === 1 && this.calls[2] === 2)
}),

check('after', async function(test) {
  test.after(() => this.calls.push(3))
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 3 &&
              this.calls[0] === 1 && this.calls[1] === 2 && this.calls[2] === 3)
})

check('beforeEach', async function(test) {
  test.beforeEach(() => this.calls.push(3))
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 4 && this.calls[0] === 3 && 
              this.calls[1] === 1 && this.calls[2] === 3 && this.calls[3] === 2)
})

check('afterEach', async function(test) {
  test.afterEach(() => this.calls.push(3))
  test('1', () => this.calls.push(1))
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(result && this.calls.length === 4 && this.calls[0] === 1 &&
              this.calls[1] === 3 && this.calls[2] === 2 && this.calls[3] === 3)
})

check('fail afterEach', async function(test) {
  test.afterEach(() => { throw new Error() })
  test('1', () => this.calls.push(1))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 1 && this.calls[0] === 1)
})

check('fail', async function(test) {
  test('1', () => { throw new Error() })
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 1 && this.calls[0] === 2)
})

check('fail and fail afterEach', async function(test) {
  test.afterEach(() => { throw new Error() })
  test('1', () => { throw new Error() })
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 1 && this.calls[0] === 2)
})

check('bail', async function() {
  const test = suite({ bail: true })
  test('1', () => { throw new Error() })
  test('2', () => this.calls.push(2))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 0)
})

check('bail from before', async function(test) {
  test.before(() => { throw new Error() })
  test('1', () => this.calls.push(1))
  const result = await run({ reporter })
  this.assert(!result && this.calls.length === 0)
})

check('prints an error', async function(test) {
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
