export default function() {
  console.log(`Runs tests written with Tehanu.

Usage: teru-esm [option ...] [pattern ...]

Options:
  -r|--reporter <name>       choose a reporter (coco, tape or custom)
  -R|--require <module>      preload a Node.js module to the process
  -b|--[no-]bail             abort after the first failure occurs
  -p|--[no-]parallel         execute test suites concurrently
  -s|--[no-]parallel-suites  execute tests in a suite concurrently
  -V|--version               print version number
  -h|--help                  print usage instructions

If no pattern is provided, ./**/*.js will be used by default.
If no reporter is provided, just errors will be printed on the console.

Examples:
  teru-esm -b
  teru-esm -r tape test/*.js`)
  process.exit(0)
}
