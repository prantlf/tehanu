import { deepEqual as deepCompare, deepStrictEqual as deepStrictCompare } from './deep-compare.mjs'

const  messages = {
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

function matchError(actual, expected) {
  if (expected instanceof Error) return expected.constructor === actual.constructor
  if (expected instanceof RegExp) return expected.test(actual.toString())
  if (typeof expected === 'function') return expected(actual)
  for (const prop in expected || {})
    if (expected[prop] !== actual[prop]) return false
  return true
}

export class AssertionError extends Error {
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

export function fail(message = 'Failed') {
  throw new AssertionError({ message, operator: 'fail', stackStartFn: fail })
}

export function ok(value, message) {
  if (!value) throw new AssertionError({
    message, actual: value, expected: true, operator: '==', stackStartFn: ok
  })
}

export function equal(actual, expected, message) {
  if (actual != expected) throw new AssertionError({
    message, actual, expected, operator: '==', stackStartFn: equal
  })
}

export function notEqual(actual, expected, message) {
  if (actual == expected) throw new AssertionError({
    message, actual, expected, operator: '!=', stackStartFn: notEqual
  })
}

export function deepEqual(actual, expected, message) {
  if (!deepCompare(actual, expected)) throw new AssertionError({
    message, actual, expected, operator: 'deepEqual', stackStartFn: deepEqual
  })
}

export function notDeepEqual(actual, expected, message) {
  if (deepCompare(actual, expected)) throw new AssertionError({
    message, actual, expected, operator: 'notDeepEqual', stackStartFn: notDeepEqual
  })
}

export function deepStrictEqual(actual, expected, message) {
  if (!deepStrictCompare(actual, expected)) throw new AssertionError({
    message, actual, expected, operator: 'deepStrictEqual', stackStartFn: deepStrictEqual
  })
}

export function notDeepStrictEqual(actual, expected, message) {
  if (deepStrictCompare(actual, expected)) throw new AssertionError({
    message, actual, expected, operator: 'notDeepStrictEqual', stackStartFn: notDeepStrictEqual
  })
}

export function strictEqual(actual, expected, message) {
  if (actual !== expected) throw new AssertionError({
    message, actual, expected, operator: '===', stackStartFn: strictEqual
  })
}

export function notStrictEqual(actual, expected, message) {
  if (actual === expected) throw new AssertionError({
    message, actual, expected, operator: '!==', stackStartFn: notStrictEqual
  })
}

export function match(actual, regexp, message) {
  if (!actual.match(regexp)) throw new AssertionError({
    message, actual, regexp, operator: '~', stackStartFn: match
  })
}

export function doesNotMatch(actual, regexp, message) {
  if (actual.match(regexp)) throw new AssertionError({
    message, actual, regexp, operator: '!~', stackStartFn: doesNotMatch
  })
}

export function throws(func, error, message) {
  if (typeof expected == 'string') {
    message = expected
    expected = null
  }
  let fail
  try {
    func()
    fail = true
  } catch (err) {
    fail = !matchError(err, error)
  }
  if (fail)
    throw new AssertionError({
      message, func, error, operator: 'throws', stackStartFn: throws
    })
}

export function doesNotThrow(func, error, message) {
  if (typeof expected == 'string') {
    message = expected
    expected = null
  }
  try {
    func()
  } catch (err) {
    if (matchError(err, error))
      throw new AssertionError({
        message, func, error, operator: 'doesNotThrow', stackStartFn: doesNotThrow
      })
    throw err
  }
}

export async function rejects(func, error, message) {
  if (!func.then) func = func()
  if (typeof expected == 'string') {
    message = expected
    expected = null
  }
  let fail
  try {
    await func
    fail = true
  } catch (err) {
    fail = !matchError(err, error)
  }
  if (fail)
    throw new AssertionError({
      message, func, error, operator: 'rejects', stackStartFn: rejects
    })
}

export async function doesNotReject(func, error, message) {
  if (!func.then) func = func()
  if (typeof expected == 'string') {
    message = expected
    expected = null
  }
  try {
    await func
  } catch (err) {
    if (matchError(err, error))
      throw new AssertionError({
        message, func, error, operator: 'doesNotThrow', stackStartFn: doesNotThrow
      })
    throw err
  }
}

export function ifError(value, message) {
  if (value != null) throw new AssertionError({
    message, actual: value, expected: null, operator: 'ifError', stackStartFn: ifError
  })
}
