# TAP Test Reporter

[![NPM version](https://badge.fury.io/js/tehanu-repo-tape.png)](http://badge.fury.io/js/tehanu-repo-tape)

Reports the test progress of tests written with [tehanu] on the console using the [TAP] protocol format.

Any [output formatter consuming TAP] can be used to re-format or otherwise process the printed output.

## Synopsis

![TAP reporter](./run-tape.png)

test.js:

```js
const test = require('tehanu')('sum'),
      { equal } = require('assert'),
      sum = require('./sum')

test('two numbers', () => equal(sum(1, 2), 3))
test('one number', () => equal(sum(1), 1))
```

## Installation

You can install the test reporter using your favourite Node.js package manager:

```
npm i -D tehanu-repo-tape
yarn add -D tehanu-repo-tape
pnpm i -D tehanu-repo-tape
```

[tehanu]: https://www.npmjs.com/package/tehanu
[TAP]: https://node-tap.org/tap-protocol/
[output formatter consuming TAP]: https://www.npmjs.com/search?q=tap%20reporter
