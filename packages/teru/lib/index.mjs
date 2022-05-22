import { schedule, get, set } from 'tehanu'
import { dirname, join, resolve } from 'path'

const { argv } = process,
      patterns = [],
      required = []
let   reporter, bail, parallel, parallelSuites

for (let i = 2, l = argv.length; i < l; ++i) {
  const arg = argv[i]
  const match = /^(?:-|--)(?:(no)-)?([a-zA-Z][-a-zA-Z]*)$/.exec(arg)
  if (match) {
    switch (match[2]) {
      case 'r': case 'reporter':
        reporter = argv[++i]
        if (reporter === 'coco' || reporter === 'tape') reporter = `tehanu-repo-${reporter}`
        continue
      case 'R': case 'require':
        required.push(argv[++i])
        continue
      case 'b': case 'bail':
        bail = match[1] !== 'no'
        continue
      case 'p': case 'parallel':
        parallel = match[1] !== 'no'
        continue
      case 's': case 'parallel-suites':
        parallelSuites = match[1] !== 'no'
        continue
      case 'V': case 'version':
        (async () => {
          const { readFile } = await import('fs/promises')
          const { fileURLToPath } = await import('url')
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

for (const name of required) require(name)

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
      search = async pattern => (glob || (glob = (await import('tiny-glob')).default))(pattern),
      guessRepo = async () => {
        const { devDependencies: deps } = await loadConf()
        return deps && Object.keys(deps).find(dep => dep.startsWith('tehanu-repo-'))
      }

(async () => {
  if (!patterns.length) push.apply(patterns, await getProp('patterns') || ['./**/*.js'])

  for (const pattern of patterns)
    if (pattern.includes('*')) push.apply(suites, await search(pattern))
    else suites.push(pattern)

  if (!suites.length) {
    console.error('no suites')
    process.exit(3)
  }

  const autostart = get('autostart')
  set('autostart', false)
  for (const suite of suites) await import(resolve(suite))
  set('autostart', autostart)

  if (!reporter) reporter = await getProp('reporter') || await guessRepo()
  if (reporter)
    try {
      reporter = await import(reporter)
    } catch {
      reporter = await import(join(process.cwd(), `node_modules/${reporter}/lib/index.mjs`))
    }
  schedule({
    autorun: true, reporter,
    bail: bail !== undefined ? bail : await getProp('bail'),
    parallel: parallel !== undefined ? parallel : await getProp('parallel'),
    parallelSuites: parallelSuites !== undefined ? parallelSuites : await getProp('parallelSuites')
  })
})()
