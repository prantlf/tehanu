# Test in Browser

[![NPM version](https://badge.fury.io/js/tehanu-tenbo.png)](http://badge.fury.io/js/tehanu-tenbo)

Runs test suites written with [tehanu] in a browser. Experimental.

## Synopsis

sum1.test.js:

```js
import test from './node_modules/tehanu/dist/suite.min.mjs?name=sum1'
import './node_modules/tehanu-repo-tape/dist/index.min.mjs'
import { equal } from './node_modules/tehanu-teas/dist/index.min.mjs'
import sum from './sum.js'

test('one number', () => equal(sum(1), 1))
```

sum2.test.js:

```js
import test from './node_modules/tehanu/dist/suite.min.mjs?name=sum2'
import './node_modules/tehanu-repo-tape/dist/index.min.mjs'
import { equal } from './node_modules/tehanu-teas/dist/index.min.mjs'
import sum from './sum.js'

test('two numbers', () => equal(sum(1, 2), 3))
```

Running `tenbo *.test.js` or `tenbo sum1.test.js sum2.test.js` allows executing some or all test suites.

## Installation

You can install the test runner using your favourite Node.js package manager. Make sure that you include `puppeteer` or `puppeteer-core`:

```
npm i -D tehanu-tenbo puppeteer
yarn add -D tehanu-tenbo puppeteer
pnpm i -D tehanu-tenbo puppeteer
```

## Usage

Run tests written with Tehanu:

    tenbo [option ...] [pattern ...]

### Options

    -o|--port <number>      port for the web server to listen to (default: 8012)
    -l|--launcher <module>  puppeteer module name (default: puppeteer)
    -e|--executable <path>  override path to the Chromium executable
    -t|--timeout <ms>       fail if no log or request occurs (default: 1000)
    -a|--[no-]headless      enable headless mode (default: true)
    -d|--[no-]disconnect    just disconnect from the browser at the end
    -v|--[no-]verbose       print more diagnostics on the console
    -V|--version            print version number and exit
    -h|--help               print usage instructions and exit

If no pattern is provided, `./**/*.js` will be used by default.

### Examples

    tenbo -l puppeteer-core
    tenbo -A -d test/*.js

## Alternative

The alternative to running tests in scripts, the tests can can be passed to the tool as one or more HTML pages.

    tenbo tests.html

tests.html:

```html
<html>
  <script type="module">
    import test from './node_modules/tehanu/dist/suite.min.mjs?name=sum1'
    import './node_modules/tehanu-repo-tape/dist/index.min.mjs'
    import { equal } from './node_modules/tehanu-teas/dist/index.min.mjs'
    import sum from './sum.js'

    test('one number', () => equal(sum(1), 1))
    test('two numbers', () => equal(sum(1, 2), 3))
  </script>
</html>
```

[tehanu]: https://www.npmjs.com/package/tehanu
