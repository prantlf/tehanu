import { run } from '../lib/index.mjs'
import * as reporter from 'tehanu-repo-tape'
import test from '../lib/suite.mjs'

test('named suite', () => {})

run({ reporter })
