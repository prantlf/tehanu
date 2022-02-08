# Changes

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
