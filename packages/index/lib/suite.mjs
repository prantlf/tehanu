import { default as tehanu } from './index.mjs'
export { run, schedule, factory, get, set, suites } from './index.mjs'

const name = new URL(import.meta.url).searchParams.get('name') || 'test'
const suite = tehanu(name)

export default suite
