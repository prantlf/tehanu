const colors = {
        black: 30, red: 31, green: 32, yellow: 33, blue: 34,
        magenta: 35, cyan: 36, white: 37, gray: 90
      },
      { env, stdout } = process,
      enabled = !('NO_COLOR' in env) && ('FORCE_COLOR' in env || stdout.isTTY
                && (process.platform === 'win32' || env.TERM !== "dumb"))

for (const name in colors ) {
  const color = colors[name]
  exports[name] = enabled ? msg => stdout.write(`\u001b[${color}m${msg}\u001b[39m`)
                          : msg => stdout.write(msg)
}
