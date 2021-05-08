const { deepEqual: deepCompare, deepStrictEqual: deepStrictCompare } = require('./deep-compare'),
      messages = {
        equal: 'to be equal',
        notEqual: 'not to be equal',
        deepEqual: 'to be deep-equal',
        notDeepEqual: 'not to be deep-equal',
        deepStrictEqual: 'to be strictly deep-equal',
        notDeepStrictEqual: 'not to be strictly deep-equal',
        strictEqual: 'to be strictly equal',
        notStrictEqual: 'not to be strictly equal'
      }

function formatValue(value) {
  return typeof value !== 'object' ? value : JSON.stringify(value, undefined, 2)
}

function formatDiff(value, prefix) {
  const text = typeof value !== 'object' ? value :
    JSON.stringify(value, undefined, 2).replace(/\n/g, `\n${prefix} `)
  return `${prefix} ${text}`
}

function generateMessage(actual, expected, operator) {
  if (operator === 'ifError') return `ifError got unwanted exception: ${formatValue(actual)}`
  if (typeof actual === 'object' || typeof expected === 'object') {
      return `Expected values ${messages[operator]}:
+ actual - expected

${formatDiff(actual, '+')}
${formatDiff(expected, '-')}`
  }
  return `${actual} ${operator} ${expected}`
}

class AssertionError extends Error {
  constructor({ message, actual, expected, operator, stackStartFn }) {
    super(message || generateMessage(actual, expected, operator))
    this.code = 'ERR_TEAS'
    this.actual = actual
    this.expected = expected
    this.operator = operator
    this.name = 'AssertionError [ERR_TEAS]'
    Error.captureStackTrace(this, stackStartFn)
    this.stack
    this.name = 'AssertionError'
  }

  toString() {
    return `${this.name} [${this.code}]: ${this.message}`
  }
}

function fail(message = 'Failed') {
  throw new AssertionError({ message, operator: 'fail', stackStartFn: fail })
}

function ok(value, message) {
  if (!value) throw new AssertionError({
    message, actual: value, expected: true, operator: '==', stackStartFn: ok
  })
}

function equal(actual, expected, message) {
  if (actual != expected) throw new AssertionError({
    message, actual, expected, operator: '==', stackStartFn: equal
  })
}

function notEqual(actual, expected, message) {
  if (actual == expected) throw new AssertionError({
    message, actual, expected, operator: '!=', stackStartFn: notEqual
  })
}

function deepEqual(actual, expected, message) {
  if (!deepCompare(actual, expected)) throw new AssertionError({
    message, actual, expected, operator: 'deepEqual', stackStartFn: deepEqual
  })
}

function notDeepEqual(actual, expected, message) {
  if (deepCompare(actual, expected)) throw new AssertionError({
    message, actual, expected, operator: 'notDeepEqual', stackStartFn: notDeepEqual
  })
}

function deepStrictEqual(actual, expected, message) {
  if (!deepStrictCompare(actual, expected)) throw new AssertionError({
    message, actual, expected, operator: 'deepStrictEqual', stackStartFn: deepStrictEqual
  })
}

function notDeepStrictEqual(actual, expected, message) {
  if (deepStrictCompare(actual, expected)) throw new AssertionError({
    message, actual, expected, operator: 'notDeepStrictEqual', stackStartFn: notDeepStrictEqual
  })
}

function strictEqual(actual, expected, message) {
  if (actual !== expected) throw new AssertionError({
    message, actual, expected, operator: '===', stackStartFn: strictEqual
  })
}

function notStrictEqual(actual, expected, message) {
  if (actual === expected) throw new AssertionError({
    message, actual, expected, operator: '!==', stackStartFn: notStrictEqual
  })
}

function ifError(value, message) {
  if (value != null) throw new AssertionError({
    message, actual: value, expected: null, operator: 'ifError', stackStartFn: ifError
  })
}

module.exports = {
  AssertionError, fail, ok, equal, notEqual, deepEqual, notDeepEqual,
  deepStrictEqual, notDeepStrictEqual, strictEqual, notStrictEqual,
  ifError
}
