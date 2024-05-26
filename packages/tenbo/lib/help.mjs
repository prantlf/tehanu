export default function() {
  console.log(`Runs tests written with Tehanu in Chromium.

Usage: tenbo [option ...] [pattern ...]

Options:
  -o|--port <number>      port for the web server to listen to (default: 8012)
  -l|--launcher <module>  puppeteer module name (default: puppeteer)
  -e|--executable <path>  override path to the Chromium executable
  -t|--timeout <ms>       fail if no log or request occurs (default: 1000)
  -c|--cache <s>          enable browser cache (default: 5)
  -a|--[no-]headless      enable headless mode (default: true)
  -d|--[no-]disconnect    just disconnect from the browser at the end
  -v|--[no-]verbose       print more diagnostics on the console
  -V|--version            print version number and exit
  -h|--help               print usage instructions and exit

Patterns can be JavaScript or HTML files. The pattern ./**/*.js is the default.

Examples:
  tenbo -l puppeteer-core
  tenbo -A -d test/*.js`)
  process.exit(0)
}
