let   count

export function start() {
  count = 0
}

export function startSuite(name, { length }) {
  console.log(`# ${name} (${length})`)
}

export function ok({ name }) {
  console.log(`ok ${++count} - ${name}`)
}

export function fail({ name }, { message, stack }) {
  let lines = stack.split('\n');
  let at = lines.findIndex(line => line.startsWith('    at '));
  stack = lines.map((line, index) => `    ${line}`).join('\n');
  console.log(`not ok ${++count} - ${name}
  ---
  message: ${message}
  at: ${at > 0 && lines[at].substring(7)}
  stack: |-
${stack}
  ...
`);
}

export function bail() {
  console.log('Bail out!')
}

export function skip({ name }) {
  console.log(`ok ${++count} - ${name} # skip`)
}

export function endSuite() {}

export function end() {
  console.log(`1..${count}`)
}

if (typeof tehanu !== 'undefined')
  tehanu.reporter = { start, startSuite, ok, fail, bail, skip, endSuite, end }
