const tty = require('tty');

const hasColors = tty.WriteStream.prototype.hasColors();

const color = number => hasColors
        ? msg => `\u001b[${number}m${msg}\u001b[39m`
        : msg => msg
const red = color(31)
const green = color(32)

const tests = [];

module.exports = function test(name, fn) {
  tests.push({ name, fn });
}

async function run() {
  let name, fn
  try {
    for ({ name, fn } of tests) {
      await fn();
      console.log(green('✔'), name);
    }
  } catch (err) {
    console.log(red('✘'), name);
    console.log(err.stack);
  }
}

setImmediate(run)
