const { mkdir, readFile, writeFile } = require('fs/promises')
const { transform } = require('esbuild')

// esbuild --minify --outfile=dist/index.min.js --sourcemap --sources-content=false lib/index.js
// esbuild --minify --outfile=dist/index.min.mjs --sourcemap --sources-content=false lib/index.mjs
// esbuild --minify --outfile=dist/suite.min.mjs --sourcemap --sources-content=false lib/suite.mjs
// sed -i 's/index.mjs/index.min.mjs/' dist/suite.min.mjs

async function minify(input, output, adapt) {
  const contents = await readFile(`lib/${input}`, 'utf8')
  let { code, map, warnings } = await transform(contents, {
    minify: true,
    sourcemap: true,
    sourcefile: `../lib/${input}`,
    sourcesContent: false
  })
  if (adapt) code = adapt(code)
  await Promise.all([
    writeFile(`dist/${output}`, `${code}//# sourceMappingURL=${output}.map`),
    writeFile(`dist/${output}.map`, map)
  ])
}

mkdir('dist', { recursive: true })
  .then(() => Promise.all([
    minify('index.js', 'index.min.js'),
    minify('index.mjs', 'index.min.mjs'),
    minify('suite.mjs', 'suite.min.mjs',
      contents => contents.replaceAll('index.mjs', 'index.min.mjs'))
  ]))
  .catch(err => {
    console.error(err)
    process.exitCode = 1
  })
