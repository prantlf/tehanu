# Benchmarks and Features

| Feature   | ava       | baretest  | jasmine   | jest      | mocha     | pta       | tap       | tape      | tehanu    | teru      | test      | uvu       | uvu-cli   | zora      |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Launch    |    1.464s |      66ms |     201ms |    2.231s |     411ms |     251ms |     706ms |     341ms |      63ms |     137ms |      68ms |      85ms |     177ms |      68ms |
| Tarball   |  2.48 MiB |  6.42 KiB |  0.15 MiB |  8.94 MiB |  1.59 MiB |  0.34 MiB |  7.80 MiB |  0.56 MiB |  4.60 KiB | 13.50 KiB |  0.16 MiB |  0.14 MiB |  0.14 MiB | 20.83 KiB |
| Unpacked  |  9.39 MiB | 14.61 KiB |  0.54 MiB | 35.38 MiB |  6.03 MiB |  1.40 MiB | 34.79 MiB |  2.58 MiB | 11.89 KiB | 50.80 KiB |  1.64 MiB |  0.48 MiB |  0.48 MiB |  0.10 MiB |
| Reporters |    yes    |     no    |    yes    |    yes    |    yes    |  yes (\*) |  yes (\*) |  yes (\*) |    yes    |    yes    |     no    |     no    |     no    |  yes (\*) |
| Async     |     no    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |    yes    |    yes    |     no    |     no    |     no    |     no    |
| Threads   |    yes    |     no    |     no    |    yes    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |
| Continue  |    yes    |     no    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |
| Bail out  |    yes    |    yes    |    yes    |    yes    |     no    |     no    |     no    |     no    |    yes    |    yes    |     no    |     no    |    yes    |     no    |
| Launcher  |    yes    |     no    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |     no    |    yes    |     no    |     no    |    yes    |     no    |

## Metrics

* **Launch**: Time to launch the test by `node` or a test runner script (depending on the framework) and execute two short tests - one succeeding and one failing. Measures the execution overhead of the test framework. Important for often test running in the development environment and CI/CD pipelines.
* **Tarball**: Download size of the package including its dependencies. Measures the installation overhead of the test framework. Important for often build container starting in CI/CD pipelines.
* **Unpacked**: Unpacked size of the package including its dependencies. Measures the space overhead of the test framework. Important for often build container starting in CI/CD pipelines.
* **Reporters**: Support for custom reporters. Important for integrations to CI/CD pipelines. (\*) means that only [TAP] format is supported. Any [output formatter consuming TAP] can be added, for the price of a performance drop.
* **Async**: Can execute tests and test suites concurrently using promises. Improves performance without using multiple CPUs.
* **Threads**: Can execute test suites concurrently using worker threads. Improves performance using multiple CPUs if multiple suites are used.
* **Continue**: Can execute tests after some of them fail. Usual approach in CI/CD pipelines.
* **Bail out**: Can abort the test execution after the first failure occurs. Usual approach in the development environment.
* **Launcher**: Was the test run by a launcher script, or were they executed from within the test script? Using a launcher adds an overhead, but offers command-line parameters to control test run without modifying the test sources.

[TAP]: https://node-tap.org/tap-protocol/
[output formatter consuming TAP]: https://www.npmjs.com/search?q=tap%20reporter
