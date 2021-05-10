# Test Runner

[![NPM version](https://badge.fury.io/js/tehanu-teru.png)](http://badge.fury.io/js/tehanu-teru)

Runs test suites written with `tehanu` in multiple source files.

## Synopsis

![Test runner](./run-teru.png)

sum1.test.js:

```js
const test = require('tehanu')('sum1'),
      assert = require('assert'),
      sum = require('./sum')

test('one number', () => assert.equal(sum(1), 1))
```

sum2.test.js:

```js
const test = require('tehanu')('sum2'),
      assert = require('assert'),
      sum = require('./sum')

test('two numbers', () => assert.equal(sum(1, 2), 3))
```

Running `teru *.test.js` or `teru sum1.test.js sum2.test.js` allows executing some or all test suites.

## Installation

You can install the test runner using your favourite Node.js package manager:

```
npm i -D tehanu-teru
yarn add -D tehanu-teru
pnpm i -D tehanu-teru
```

## Alternative

The alternative to the `teru` test runner is creating a test suite index and executing it by `node tests`:

tests.js:

```js
require('./sum1.test')
require('./sum2.test')
```
