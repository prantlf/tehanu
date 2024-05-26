import { minify } from 'rollup-plugin-swc-minify'

export default {
  input: 'src/index.mjs',
  output: [
    {
      file: 'dist/index.mjs',
      sourcemap: true
    },
    {
      file: 'dist/index.min.mjs',
      sourcemap: true,
      plugins: [minify()]
    },
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'tehanuTeas',
      sourcemap: true
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'tehanuTeas',
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
