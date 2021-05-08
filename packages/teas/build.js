const { build } = require('@prantlf/esbuild')

const builds = [
  {
    outfile: 'dist/index.esm.js',
    format: 'esm'
  },
  {
    outfile: 'dist/index.umd.js',
    format: 'umd',
    globalName: 'tehanuTeas'
  },
  {
    outfile: 'dist/index.umd.min.js',
    format: 'umd',
    globalName: 'tehanuTeas',
    minify: true
  },
  {
    outfile: 'dist/index.js',
    format: 'cjs'
  }
]

Promise
  .all(builds.map(opts =>
    build({ ...opts, entryPoints: ['index.js'], bundle: true, sourcemap: true })))
  .catch(() => process.exit(1))
