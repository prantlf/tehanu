# Test Assertions

[![NPM version](https://badge.fury.io/js/tehanu-teas.png)](http://badge.fury.io/js/tehanu-teas)

Provides a set of assertion methods compatible with the [built-in `assert` module] usable in both Node.js and the browser.

## Synopsis

```js
const test = require('tehanu')('sum'),
      { equal } = require('tehanu-teas'),
      sum = require('./sum'),
      test = tehanu('sum')

test('two numbers', () => equal(sum(1, 2), 3))
```

## Installation

You can install the assertion library using your favourite Node.js package manager:

```
npm i -D tehanu-teas
yarn add -D tehanu-teas
pnpm i -D tehanu-teas
```

[built-in `assert` module]: https://nodejs.org/api/assert.html
