const checks = []

function assert(ok) {
  if (!ok) throw new Error(`${this.title} - calls ${this.calls}, code ${process.exitCode}`)
}

export function check(suite, name, fn) {
  const { suites } = suite
  checks.push(function check() {
    suites.splice(0, suites.length)
    process.exitCode = undefined
    check.assert = assert
    check.calls = []
    check.title = name
    return fn.call(check, suite())
  })
}

export async function start({ start, startSuite, ok, fail, bail, endSuite, end }) {
  let check
  try {
    start()
    startSuite('tehanu-mjs', checks)
    for (check of checks) {
      await check()
      ok({ name: check.title })
    }
    endSuite()
    end()
    process.exit(0)
  } catch (err) {
    fail({ name: check.title }, err)
    bail()
    process.exit(1)
  }
}
