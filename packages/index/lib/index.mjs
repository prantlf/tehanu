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
  if (typeof window === 'undefined')
    setImmediate(async () => {
      if (!started) {
        const { readFile } = await import('fs/promises')
        let tehanu, deps
        for (let i = 0, name = 'package.json'; i < 10; ++i, name = `../${name}`)
          try {
            ({ tehanu, devDependencies: deps } = JSON.parse(await readFile(name, 'utf8')))
            break
          } catch {}
        let {
          reporter = reporter1, bail = bail1, parallel = parallel1, parallelSuites = parallelSuites1, autostart
        } = { ...(tehanu || {}), ...config }
        if (!autorun || autostart !== false) {
          if (!reporter && deps)
            reporter = Object.keys(deps).find(dep => dep.startsWith('tehanu-repo-'))
          if (typeof reporter === 'string')
            try {
              reporter = await import(reporter)
            } catch {
              const { join } = await import('path')
              reporter = await import(join(process.cwd(), `node_modules/${reporter}/lib/index.mjs`))
            }
          run({ reporter: reporter || log, bail, parallel, parallelSuites })
        }
      }
    })
  else addEventListener('load', () => {
    const {
      reporter = reporter1, bail = bail1, parallel = parallel1, parallelSuites = parallelSuites1, autostart
    } = { ...(window.tehanu || {}), ...config }
    if (!started && autostart !== false) run({ reporter, bail, parallel, parallelSuites })
  })
}

function suite(name) {
  if (typeof window === 'undefined' && typeof name === 'string') {
    const cwd = process.cwd()
    const start = name.indexOf(cwd)
    if (start >= 0) {
      const end = name.endsWith('.js') ? 3 : name.endsWith('.mjs') || name.endsWith('.cjs') ? 4 : 0
      name = name.substring(start + cwd.length + 1, name.length - end)
    }
  }
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

if (typeof window !== 'undefined' && !window.tehanu) window.tehanu = {}

suite.run = run
suite.schedule = schedule
suite.factory = suite
suite.suites = suites

export default suite
export { run, schedule, suite as factory, get, set, suites }
