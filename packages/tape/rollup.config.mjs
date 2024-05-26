import { minify } from 'rollup-plugin-swc-minify'

export default {
  input: 'lib/index.mjs',
  output: [
    {
      file: 'dist/index.min.mjs',
      sourcemap: true,
      plugins: [minify()]
    },
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'tehanuTape',
      sourcemap: true
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'tehanuTape',
      sourcemap: true,
      plugins: [minify()]
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true
    }
  ]
}
