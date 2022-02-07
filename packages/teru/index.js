const { argv } = process,
      patterns = [],
      required = []
let   reporter, bail, parallel, parallelSuites

for (let i = 2, l = argv.length; i < l; ++i) {
  const arg = argv[i]
  const match = /^(?:-|--)(?:(no)-)?([-a-zA-Z]+)$/.exec(arg)
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
        console.log(require('./package.json').version)
        process.exit(0)
      case 'h': case 'help':
        require('./help')()
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
      loadConf = () => {
        if (pkg) return pkg
        const { existsSync, readFileSync } = require('fs')
        for (let i = 0, pkg = 'package.json'; i < 10; ++i, pkg = `../${pkg}`)
          if (existsSync(pkg)) return pkg = JSON.parse(readFileSync(`./${pkg}`, 'utf8'))
        return pkg = {}
      },
      getProp = name => (tehanu || (tehanu = loadConf().tehanu || {}))[name],
      search = pattern => (glob || (glob = require('tiny-glob/sync')))(pattern),
      guessRepo = () => {
        const deps = loadConf().devDependencies
        return deps && Object.keys(deps).find(dep => dep.startsWith('tehanu-repo-'))
      }

if (!patterns.length) push.apply(patterns, getProp('patterns') || ['./**/*.js'])

for (const pattern of patterns)
  if (pattern.includes('*')) push.apply(suites, search(pattern))
  else suites.push(pattern)

if (!suites.length) {
  console.error('no suites')
  process.exit(3)
}

const { schedule } = require('tehanu'),
      { resolve } = require('path')

for (const suite of suites) require(resolve(suite))
if (!reporter) reporter = getProp('reporter') || guessRepo()
schedule({
  autorun: true,
  reporter: reporter && require(reporter),
  bail: bail !== undefined ? bail : getProp('bail'),
  parallel: parallel !== undefined ? parallel : getProp('parallel'),
  parallelSuites: parallelSuites !== undefined ? parallelSuites : getProp('parallelSuites')
})
