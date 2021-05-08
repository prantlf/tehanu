const { promisify } = require('util'),
      { execFile } = require('child_process'),
      spawn = promisify(execFile),
      runners = {
        ava: ['./node_modules/.bin/ava', 'suites/ava/**'],
        baretest: ['node', 'suites/baretest'],
        jasmine: ['./node_modules/.bin/jasmine', 'suites/jasmine'],
        jest: ['./node_modules/.bin/jest', 'suites/jest', '--env=node'],
        mocha: ['./node_modules/.bin/mocha', 'suites/mocha'],
        pta: ['./node_modules/.bin/pta', 'suites/pta/index.js'],
        tap: ['./node_modules/.bin/tap', '--no-coverage', 'suites/tap'],
        tape: ['./node_modules/.bin/tape', 'suites/tape'],
        tehanu: ['node', 'suites/tehanu'],
        teru: ['./node_modules/.bin/teru', '-r', 'tape', 'suites/teru'],
        test: ['node', 'suites/test'],
        uvu: ['./node_modules/.bin/uvu', 'suites/uvu'],
        zora: ['node', 'suites/zora']
      }

function format([s, ns]) {
  const ms = Math.round(ns / 1e6)
  return s > 0 ? `   ${(s + ms / 1e3).toFixed(3)}s` : ms > 99 ? `    ${ms}ms` :  `     ${ms}ms`
}

async function run(name, args) {
  const start = process.hrtime(),
        { error, stderr, stdout } = await spawn(args[0], args.slice(1), { cwd: __dirname })

  runners[name] = process.hrtime(start)
  if (error) console.log(stderr || stdout)
}

(async () => {
  try {
    for (const name in runners) await run(name, runners[name])
    console.log('| Feature |', Object.keys(runners).map(name => name.padEnd(9)).join(' | '), '|')
    console.log('| ------- |' + ' --------- |'.repeat(Object.keys(runners).length))
    console.log('| Launch  |', Object.values(runners).map(format).join(' | '), '|')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
