const { build } = require('@prantlf/esbuild')

const builds = [
  {
    outfile: 'dist/index.esm.js',
    format: 'esm'
  },
  {
    outfile: 'dist/index.esm.min.js',
    format: 'esm',
    minify: true
  },
  {
    outfile: 'dist/index.umd.js',
    format: 'umd',
    globalName: 'tehanu'
  },
  {
    outfile: 'dist/index.umd.min.js',
    format: 'umd',
    globalName: 'tehanu',
    minify: true
  },
  {
    outfile: 'dist/index.js',
    format: 'cjs'
  }
]

Promise
  .all(builds.map(opts =>
    build({ ...opts, entryPoints: ['index.js'], platform: 'node', bundle: true, sourcemap: true })))
  .catch(() => process.exit(1))
