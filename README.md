## Test Harness Ultra

[![NPM version](https://badge.fury.io/js/tehanu.png)](http://badge.fury.io/js/tehanu)
[![Build Status](https://github.com/prantlf/tehanu/workflows/Test/badge.svg)](https://github.com/prantlf/tehanu/actions)

[Blazingly fast](./benchmarks#readme), tiny and simple JavaScript test framework for both Node.js and the browser with pluggable reporters and an optional runner.

* Tiny size - 2.13 kB minified, 1.02 kB gzipped.
* Zero dependencies.
* TypeScript declaration included.

See the documentation of [packages](#packages) for more information.

## Synopsis

```js
const test = require('tehanu')('sum'),
      assert = require('assert'),
      sum = require('./sum')

test('one number', () => assert.equal(sum(1), 1))
test('two numbers', () => assert.equal(sum(1, 2), 3))
```

## Installation

You can install the [test harness](./packages/index#readme) with a chosen reporter using your favourite Node.js package manager:

```sh
npm i -D tehanu tehanu-repo-coco
yarn add -D tehanu tehanu-repo-coco
pnpm i -D tehanu tehanu-repo-coco
```

## Packages

* [tehanu](./packages/index#readme) - a framework for creation and execution of test suites.
* [teas](./packages/teas#readme) - a set of assertion methods compatible with the [built-in `assert` module] usable in both Node.js and the browser.
* [teru](./packages/teru#readme) - an optional test runner for tests written with `tehanu`.
* [coco](./packages/coco#readme) - a colourful console reporter.
* [tape](./packages/tape#readme) - a reporter compatible with the [TAP] format specification.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using `npm test`.

## License

Copyright (c) 2021-2022 Ferdinand Prantl

Licensed under the MIT license.

[built-in `assert` module]: https://nodejs.org/api/assert.html
[TAP]: https://node-tap.org/tap-protocol/
