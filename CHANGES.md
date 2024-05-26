# Changes

## tenbo 0.2.0

* Allow specifying multiple HTML pages on the command line.
* Avoid favicon requests from the test pages.

## tenbo 0.1.0

* Add parameter `-t|--timeout=ms` to fail the tests if a log or a network request does not occur in time.
* Set `process.exitCode = 1` is a test failed.

## tape 1.0.1

* Fix formatting of error message, location and call stack

## tehanu 1.0.1

* Cut relative path from file URL too, not only from absolute path
* Cut the JavaScript file extension from the suite name based on file path

## tehanu 1.0.0, teru 1.0.0, teas 1.0.0, tape 1.0.0, coco 1.0.0, tenbo: 0.0.1

* Support ESM projects in Node.js and in the browser.
* Export `get` and `set` methods to read and write configuration parameters,
  which are usually passed by the `tehanu` object from `pacjkage.json`
  or `window` (in the browser), but it may be useful to access them from
  test scripts too.
* Add an ESM runner in Node.js - teru-esm.
* Add another alias for CJS/UMD runner in Node.js - teru-cjs.
* Add an experimental runner in browser - tenbo.
* Complete the assertions in teas to match Node.js 18.
* Replace `esbuild` with `swc` and use it only for minification. Bundle
  with `rollup`. (`esbuild` doesn't support UMD and I don't have time
  to maintain `@prantlf/esbuild` any more. `rollup` produces the most
  readable output, which is useful, if source maps fail.)

**NOTE:** The ESM support needs Node.js 14.13 or newer.

## tehanu 0.2.2

* Fix occasional re-initialising the tests.
  At least it did not lead to re-running the tests.

## teru 0.2.2

* Move `tehanu` to peer dependencies of `teru`.

## tehanu 0.2.1

* Stop using fs sync methods to read from `package.json`.

## tehanu 0.2.0, teru 0.2.1

* Export `schedule` to allow executing the test suites manually and compatibly with `teru`.
* Export `factory` together with `schedule` to allow importing both of them as named exports.

## teru 0.2.0

* Add alias `tehanu` to the script `teru` to solve conflicts in some projects.

## tehanu 0.0.4, teru 0.1.2

* Cut the relative path from the test suite name if __filename is specified.
* Upgrade NPM dependencies.

## teru 0.1.1

* Fix version dependencies.

## teru 0.1.0

* Add an option to preload Node.js modules.

## tehanu 0.0.3

* Fix typescript type for the test callback.

## 0.0.2

* Fix running in the browser.
* Fix the list of distributed files in `tehanu` and `tehanu-repo-tape`.
* Add minified ESM build output.
* Improve the package ionformation and the documentation.

## 0.0.1

Initial release.
