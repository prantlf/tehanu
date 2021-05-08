let   count
const tap = {
  start() {
    count = 0
  },

  startSuite(name, { length }) {
    console.log(`# ${name} (${length})`)
  },

  ok({ name }) {
    console.log(`ok ${++count} - ${name}`)
  },

  fail({ name }, { stack }) {
    console.log(`not ok ${++count} - ${name}

${stack}
`)
  },

  bail() {
    console.log('Bail out!')
  },

  skip({ name }) {
    console.log(`ok ${++count} - ${name} # skip`)
  },

  endSuite() {},

  end() {
    console.log(`1..${count}`)
  }
}

if (typeof window !== 'undefined') tehanu.reporter = tap

module.exports = tap