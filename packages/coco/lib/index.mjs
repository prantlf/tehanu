const { env, stdout } = process,
      enabled = !('NO_COLOR' in env) && ('FORCE_COLOR' in env || stdout.isTTY
                && (process.platform === 'win32' || env.TERM !== "dumb")),
      color = number => enabled
        ? msg => stdout.write(`\u001b[${number}m${msg}\u001b[39m`)
        : msg => stdout.write(msg)

// const black = color(30)
const red = color(31)
const green = color(32)
const yellow = color(33)
// const blue = color(34)
const magenta = color(35)
const cyan = color(36)
// const white = color(37)
const gray = color(90)

const printError = err => {
  const { stack } = err
  const eol = stack.indexOf('\n') + 1
  yellow(stack.slice(0, eol))
  gray(`${stack.slice(eol)}

`)
}

let   count, failed

export function start() {}

export function startSuite(name, { length }) {
  count = length
  failed = 0
  cyan(`${name} `)
}

export function ok() { gray('•') }

export function fail({ name }, err) {
  ++failed
  red(`

Failed: ${name}

`)
  printError(err)
}

export function bail() {}

export function skip() {}

export function endSuite() {
  if (failed) magenta(` ✘ ${failed} of ${count}
`)
  else green(` ✔ ${count}
`)
}

export function end() {}
