const { cyan, gray, red, green, yellow, magenta } = require('./colors'),
      printError = err => {
        const { stack } = err
        const eol = stack.indexOf('\n') + 1
        yellow(stack.slice(0, eol))
        gray(`${stack.slice(eol)}

`)
      }
let   count, failed

module.exports = {
  start() {},

  startSuite(name, { length }) {
    count = length
    failed = 0
    cyan(`${name} `)
  },

  ok() { gray('•') },

  fail({ name }, err) {
    ++failed
    red(`

Failed: ${name}

`)
    printError(err)
  },

  bail() {},

  skip() {},

  endSuite() {
    if (failed) magenta(` ✘ ${failed} of ${count}
`)
    else green(` ✓ ${count}
`)
  },

  end() {}
}
