(function (global, factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.tehanu = factory())
})(this, (function () { 'use strict'

  const suites = [],
        all = async fns => { for (const fn of fns) await fn() },
        nop = () => {},
        log = {
          start: nop,
          startSuite: nop,
          ok: nop,
          fail({ name }, { stack }) {
            console.error(`Failed: ${name}

${stack}`)
          },
          bail: nop,
          skip: nop,
          endSuite: nop,
          end: nop
        }
  let   config = {}, started

  function get(name) {
    return config[name]
  }

  function set(name, value) {
    if (typeof name === 'string') {
      if (value === undefined) delete config[name]
      else config[name] = value
    } else {
      if (value) config = { ...name }
      else config = { ...config, ...name }
    }
  }

  async function run({ reporter, bail: abortAll, parallel, parallelSuites } = {}) {
    const { start, startSuite, ok, fail, bail, skip, endSuite, end } = reporter || log
    let   failed, aborted

    started = true
    start()
    if (parallel) await Promise.all(suites.map(runSuite))
    else for (const suite of suites) await runSuite(suite)
    if (!aborted) end()
    if (failed && typeof process !== 'undefined') process.exitCode = 1
    return !failed

    async function runSuite(suite) {
      const { name, tests, only, before, after, beforeEach, afterEach, bail: abortSuite, parallel: parallelSuite } = suite,
            cases = only.length ? only : tests,
            abort = abortSuite !== undefined ? abortSuite : abortAll,
            parallel = parallelSuite !== undefined ? parallelSuite : parallelSuites,
            run = async test => {
              const { fn } = test
              if (fn) {
                let succeeded
                try {
                  await all(beforeEach)
                  await fn()
                  succeeded = true
                  await all(afterEach)
                  ok(test)
                } catch (err) {
                  failed = true
                  if (!succeeded) { try { await all(afterEach) } catch {} }
                  fail(test, err)
                  if (abort) throw new Error()
                }
              } else skip(test)
            }

      startSuite(name, cases)

      try {
        await all(before)

        try {
          if (parallel) await Promise.all(cases.map(run))
          else for (const test of cases) await run(test)
        } catch {
          aborted = true
          bail()
        }

        await all(after)
      } catch {
        failed = true
      }

      if (aborted) return
      endSuite()
    }
  }

  function schedule({
    autorun, reporter: reporter1, bail: bail1, parallel: parallel1, parallelSuites: parallelSuites1
  } = {}) {
    addEventListener('load', () => {
      const {
        reporter = reporter1, bail = bail1, parallel = parallel1, parallelSuites = parallelSuites1, autostart
      } = { ...(window.tehanu || {}), ...config }
      if (!started && (!autorun || autostart !== false)) run({ reporter, bail, parallel, parallelSuites })
    })
  }

  function suite(name) {
    const tests = [], only = [], before = [], after = [], beforeEach = [], afterEach = [],
          suite = (name, fn) => tests.push({ name, fn })
    let   bail, parallel
    if (typeof name === 'object') ({ name, bail, parallel } = name)

    suite.test = suite
    suite.only = (name, fn) => only.push({ name, fn })
    suite.skip = name => tests.push({ name })

    suite.before = fn => before.push(fn)
    suite.after = fn => after.push(fn)
    suite.beforeEach = fn => beforeEach.push(fn)
    suite.afterEach = fn => afterEach.push(fn)

    if (!suites.length) schedule({ autorun: true })

    suites.push({ name, tests, only, before, after, beforeEach, afterEach, bail, parallel })

    return suite
  }

  if (!window.tehanu) window.tehanu = {}

  suite.run = run
  suite.schedule = schedule
  suite.factory = suite
  suite.suites = suites
  suite.get = get
  suite.set = set

  return suite
}))
