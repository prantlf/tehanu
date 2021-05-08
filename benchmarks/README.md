# Benchmarks and Features

| Feature  | ava       | baretest  | jasmine   | jest      | mocha     | pta       | tap       | tape      | tehanu    | teru      | test      | uvu       | zora      |
| -------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Launch   |    1.294s |      56ms |     118ms |    1.168s |     310ms |     149ms |     505ms |     219ms |      48ms |      71ms |      56ms |     126ms |      60ms |
| Tarball  |  2.48 MiB |  6.42 KiB |  0.15 MiB |  8.94 MiB |  1.59 MiB |  0.34 MiB |  7.80 MiB |  0.56 MiB |  1.81 KiB | 14.51 KiB |  0.16 MiB |  0.14 MiB | 20.83 KiB |
| Unpacked |  9.39 MiB | 14.61 KiB |  0.54 MiB | 35.38 MiB |  6.03 MiB |  1.40 MiB | 34.79 MiB |  2.58 MiB |  1.81 KiB | 14.51 KiB |  1.64 MiB |  0.48 MiB |  0.10 MiB |
| Reports  |    yes    |     no    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |
| Async    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |    yes    |    yes    |     no    |     no    |     no    |
| Threads  |    yes    |     no    |     no    |    yes    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |     no    |
| Continue |    yes    |     no    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |    yes    |
| Bail out |    yes    |    yes    |    yes    |    yes    |     no    |     no    |     no    |     no    |    yes    |    yes    |     no    |     no    |     no    |

## Metrics

* **Launch**: Time to launch the test by `node` or a test runner script (depending on the framework) and execute two short tests - one succeeding and one failing. Measures the execution overhead of the test framework. Important for often test running in the development environment and CI/CD pipelines.
* **Tarball**: Download size of the package including its dependencies. Measures the installation overhead of the test framework. Important for often build container starting in CI/CD pipelines.
* **Unpacked**: Unpacked size of the package including its dependencies. Measures the space overhead of the test framework. Important for often build container starting in CI/CD pipelines.
* **Reports**: Support for custom reporters. Important for integrations to CI/CD pipelines.
* **Async**: Can execute tests and test suites concurrently using promises. Improves performance without using multiple CPUs.
* **Threads**: Can execute test suites concurrently using worker threads. Improves performance using multiple CPUs if multiple suites are used.
* **Continue**: Can execute tests after some of them fail. Usual approach in CI/CD pipelines.
* **Bail out**: Can abort the test execution after the first failure occurs. Usual approach in the development environment.
