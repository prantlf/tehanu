import { blue, cyan, green, magenta, red, yellow } from 'colorette'
import polka from 'polka'
import sirv from 'sirv'

const { argv } = process, patterns = []
let   port = 8012, headless = true, timeout = 1000,
      verbose, disconnect, launcher, executablePath

for (let i = 2, l = argv.length; i < l; ++i) {
  const arg = argv[i]
  const match = /^(?:-|--)(?:(no)-)?([a-zA-Z][-a-zA-Z]*)$/.exec(arg)
  if (match) {
    const opt = match[2]
    switch (opt) {
      case 'o': case 'port':
        port = +argv[++i]
        continue
      case 'l': case 'launcher':
        launcher = argv[++i]
        continue
      case 'e': case 'executable':
        executablePath = argv[++i]
        continue
      case 't': case 'timeout':
        timeout = +argv[++i]
        continue
      case 'a': case 'A': case 'headless':
        headless = opt === 'A' ? false : match[1] !== 'no'
        continue
      case 'd': case 'disconnect':
        disconnect = match[1] !== 'no'
        continue
      case 'v': case 'verbose':
        verbose = match[1] !== 'no'
        continue
      case 'V': case 'version':
        (async () => {
          const { readFile } = await import('fs/promises')
          const { fileURLToPath } = await import('url')
          const { join, dirname } = await import('path')
          const pkg = join(dirname(fileURLToPath(import.meta.url)), '../package.json')
          console.log(JSON.parse(await readFile(pkg, 'utf8')).version)
          process.exit(0)
        })()
        continue
      case 'h': case 'help':
        (await import('./help.mjs')).default()
    }
    console.error(`unknown option: "${match[0]}"`)
    process.exit(2)
  }
  patterns.push(arg)
}

let   pkg, tehanu, glob
const { push } = Array.prototype,
      suites = [],
      loadConf = async () => {
        if (pkg) return pkg
        const { readFile } = await import('fs/promises')
        for (let i = 0, pkg = 'package.json'; i < 10; ++i, pkg = `../${pkg}`)
          try {
            return pkg = JSON.parse(await readFile(pkg, 'utf8'))
          } catch {}
        return pkg = {}
      },
      getProp = async name => (tehanu || (tehanu = (await loadConf()).tehanu || {}))[name],
      search = async pattern => (glob || (glob = (await import('tiny-glob')).default))(pattern);

(async () => {
  if (!patterns.length) push.apply(patterns, await getProp('patterns') || ['./**/*.js'])

  for (const pattern of patterns)
    if (pattern.includes('*')) push.apply(suites, await search(pattern))
    else suites.push(pattern)

  if (!suites.length) {
    console.error('no suites')
    process.exit(3)
  }

  let pages = [], scripts
  for (const suite of suites) {
    if (suite.endsWith('.html')) {
      const url = `/${suite}`
      pages.push({ url })
    } else {
      scripts = true
    }
  }
  if (scripts) {
    const lines = ['<html>']
    for (const suite of suites) {
      if (!suite.endsWith('.html'))
        lines.push(`  <script type="module" src="${suite}"></script>`)
    }
    lines.push(`</html>`)
    const url = '/test'
    const content = lines.join('\n')
    pages.push({ url, content })
  }

  const server = serve({ port, pages, verbose })
  try {
    const browser = await launch()
    try {
      await open(browser, pages)
    } finally {
      if (browser)
        if (disconnect) browser.disconnect()
        else browser.close()
    }
  } finally {
    if (!disconnect) server.close()
  }
})()

function serve({ port, pages, verbose }) {
  const app = polka()
  for (const { url, content } of pages) {
    if (content)
      app.use((req, res, next) => {
        if (req.url !== url) return next()
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      })
  }
  app
    .use(sirv('.', {
      maxAge: 5,
      setHeaders: (res, path) => {
        if (path.includes('.mjs') || path.includes('.js'))
          res.setHeader('Content-Type', 'application/javascript')
        res.setHeader('Access-Control-Allow-Origin', '*')
      }
    }))
  app.listen(port, () => verbose && console.log(cyan(`INF Listening on localhost:${port}`)))
  return app.server
}

function collect(page, waiting) {
  return new Promise((resolve, reject) => {
    let failed
    const onconsole = message => {
      const text = message.text()
      if (verbose) {
        const type = message.type().substr(0, 3).toUpperCase()
        const colors = {
          LOG: text => text,
          ERR: red,
          WAR: yellow,
          INF: cyan
        }
        const color = colors[type] || blue
        console.log(color(text))
      } else {
        console.log(text)
      }
      waiting.start()
      if (text.startsWith('not ok'))
        failed = true
      else if (text.match(/^\d+\.\.\d+$/)) {
        page
          .off('console', onconsole)
          .off('response', onresponse)
          .off('pageerror', onpageerror)
          .off('requestfailed', onrequestfailed)
        if (failed) reject()
        else resolve()
      }
    }
    const onresponse = response => {
      verbose && console.info(green(`${response.status()} ${response.url()}`))
      waiting.start()
    }
    const onpageerror = ({ message }) => {
      if (verbose) message = red(message)
      console.error(message)
      failed = true
    }
    const onrequestfailed = request => verbose &&
      console.warn(magenta(`${request.failure().errorText} ${request.url()}`))
    page
      .on('console', onconsole)
      .on('response', onresponse)
      .on('pageerror', onpageerror)
      .on('requestfailed', onrequestfailed)
  })
}

function wait() {
  let handler, fail
  const promise = new Promise((resolve, reject) => fail = reject)
  promise.abort = () => clearTimeout(handler)
  promise.start = () => {
    if (handler) clearTimeout(handler)
    handler = setTimeout(() => fail(new Error('Test timeout')), timeout)
  }
  return promise
}

async function launch() {
  const { env } = process
  const { default: puppeteer } = (await import(launcher || 'puppeteer'))

  return await puppeteer.launch({
    headless, args: env.CI ? ['--no-sandbox'] : [],
    executablePath: executablePath || env.PUPPETEER_EXECUTABLE_PATH,
    dumpio: false, devtools: false, userDataDir: undefined
  })
}

async function open(browser, pages) {
  let page, waiting
  try {
    page = await browser.newPage()
    for (const { url } of pages) {
      verbose && console.log(cyan(`INF Opening ${url}`))
      waiting = wait()
      const collecting = collect(page, waiting)
      await page.goto(`http://localhost:${port}${url}`)
      waiting.start()
      await Promise.race([collecting, waiting])
    }
  } catch (error) {
    if (error) {
      let message = verbose ? error : error.message
      if (verbose) message = red(message)
      console.error(message)
    }
    process.exitCode = 1
  } finally {
    if (waiting) waiting.abort()
    if (page && !disconnect) page.close()
  }
}
