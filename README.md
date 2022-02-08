## Test Harness Ultra

[![Latest version](https://img.shields.io/npm/v/tehanu)](https://www.npmjs.com/package/tehanu)
[![Dependency status](https://img.shields.io/librariesio/release/npm/tehanu-teru)](https://www.npmjs.com/package/tehanu-teru)

[Blazingly fast](./benchmarks#readme), tiny and simple JavaScript test framework for both Node.js and the browser with pluggable reporters and an optional runner.

* Tiny size - 2.42 kB minified, 1.15 kB gzipped, 1.02 kB brotlied.
* Zero dependencies.
* TypeScript declarations included.

See the documentation of the [packages](#packages) for more information.

## Synopsis

```js
const test = require('tehanu')('sum'),
      assert = require('assert'),
      sum = require('./sum')

test('one number', () => assert.equal(sum(1), 1))
test('two numbers', () => assert.equal(sum(1, 2), 3))
```

## Installation

You can install the [test harness](./packages/index#readme), typically with a chosen reporter and optionally with the command-line runner using your favourite Node.js package manager:

```sh
npm i -D tehanu tehanu-repo-coco tehanu-teru
yarn add -D tehanu tehanu-repo-coco tehanu-teru
pnpm i -D tehanu tehanu-repo-coco tehanu-teru
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
