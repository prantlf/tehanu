const test = require('tehanu')('teas'),
      assert = require('assert'),
      {
				AssertionError, fail, ok, equal, notEqual, deepEqual, notDeepEqual,
				deepStrictEqual, notDeepStrictEqual, strictEqual, notStrictEqual, ifError
			} = require('.')

test('AssertionError with generated message', () =>
	assert.strictEqual(new AssertionError({ actual: 0, expected: 1, operator: '==' }).toString(), 'AssertionError [ERR_TEAS]: 0 == 1'))
test('AssertionError with custom message', () =>
	assert.strictEqual(new AssertionError({ message: 'test' }).toString(), 'AssertionError [ERR_TEAS]: test'))
test('AssertionError with generated message for objects', () =>
	assert.strictEqual(new AssertionError({ actual: 0, expected: {a:1}, operator: 'deepStrictEqual' }).toString(),
		`AssertionError [ERR_TEAS]: Expected values to be strictly deep-equal:
+ actual - expected

+ 0
- {
-   "a": 1
- }`))
test('AssertionError with ifError for promitives', () =>
	assert.strictEqual(new AssertionError({ actual: 1, expected: null, operator: 'ifError' }).toString(),
		'AssertionError [ERR_TEAS]: ifError got unwanted exception: 1'))
test('AssertionError with ifError for objects', () =>
	assert.strictEqual(new AssertionError({ actual: {a:1}, expected: null, operator: 'ifError' }).toString(),
		`AssertionError [ERR_TEAS]: ifError got unwanted exception: {
  "a": 1
}`))

test('fail throws', () =>
	assert.throws(() => fail('test'), AssertionError))

test('ok with truthy', () =>
	assert.doesNotThrow(() => ok(1)))
test('ok with falsy', () =>
	assert.throws(() => ok(0), AssertionError))

test('equal with same', () =>
	assert.doesNotThrow(() => equal(1, 1)))
test('equal with equal', () =>
	assert.doesNotThrow(() => equal(1, '1')))
test('equal with not equal', () =>
	assert.throws(() => equal(1, 2), AssertionError))

test('notEqual with same', () =>
	assert.throws(() => notEqual(1, 1), AssertionError))
test('notEqual with equal', () =>
	assert.throws(() => notEqual(1, '1'), AssertionError))
test('notEqual with not equal', () =>
	assert.doesNotThrow(() => notEqual(1, 2)))

test('deepEqual with same', () =>
	assert.doesNotThrow(() => deepEqual({a:1}, {a:1})))
test('deepEqual with equal', () =>
	assert.doesNotThrow(() => deepEqual({a:1}, {a:'1'})))
test('deepEqual with not equal', () =>
	assert.throws(() => deepEqual({a:1}, {a:2}), AssertionError))

test('notDeepEqual with same', () =>
	assert.throws(() => notDeepEqual({a:1}, {a:1}), AssertionError))
test('notDeepEqual with equal', () =>
	assert.throws(() => notDeepEqual({a:1}, {a:'1'}), AssertionError))
test('notDeepEqual with not same', () =>
	assert.doesNotThrow(() => notDeepEqual({a:1}, {a:2})))

test('deepStrictEqual with same', () =>
	assert.doesNotThrow(() => deepStrictEqual({}, {})))
test('deepStrictEqual with not same', () =>
	assert.throws(() => deepStrictEqual({a:1}, {a:'1'}), AssertionError))

test('notDeepStrictEqual with same', () =>
	assert.throws(() => notDeepStrictEqual({}, {}), AssertionError))
test('notDeepStrictEqual with not same', () =>
	assert.doesNotThrow(() => notDeepStrictEqual({}, {a:1})))

test('strictEqual with same', () =>
	assert.doesNotThrow(() => strictEqual(1, 1)))
test('strictEqual with equal', () =>
	assert.throws(() => strictEqual(1, '1'), AssertionError))

test('notStrictEqual with same', () =>
	assert.throws(() => notStrictEqual(1, 1), AssertionError))
test('notStrictEqual with not same', () =>
	assert.doesNotThrow(() => notStrictEqual(1, '1')))

test('ifError for success', () =>
	assert.throws(() => ifError(1), AssertionError))
test('ifError for failure', () =>
	assert.doesNotThrow(() => ifError(null)))
