## Test Harness Ultra

[![NPM version](https://badge.fury.io/js/tehanu.png)](http://badge.fury.io/js/tehanu)
[![Build Status](https://github.com/prantlf/tehanu/workflows/Test/badge.svg)](https://github.com/prantlf/tehanu/actions)

Blazingly fast, tiny and simple JavaScript test framework with pluggable reporters and an optional runner.

* Tiny size - 2.13 kB minified, 1.02 kB gzipped.
* Zero dependencies.
* TypeScript declaration included.

## Synopsis

```js
const test = require('tehanu')('sum'),
      assert = require('assert'),
      sum = require('../sum')

test('one number', () => assert.equal(sum(1), 1))
test('two numbers', () => assert.equal(sum(1, 2), 3))
```

## Installation

You can install the test harness with a reporter using your favourite Node.js package manager:

```sh
npm i -D tehanu tehanu-repo-coco
yarn add -D tehanu tehanu-repo-coco
pnpm i -D tehanu tehanu-repo-coco
```

Another installable reporter is `tehanu-repo-tape`. The optional test runner can be installed with `tehanu-teru`.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using `npm test`.

## License

Copyright (c) 2021 Ferdinand Prantl

Licensed under the MIT license.
