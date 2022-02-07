export type Fn = () => void | Promise<void>

export interface Test {
  readonly name: string
  readonly fn?: Fn
}

export interface Reporter {
  start(): void
  startSuite(name: string, tests: Test[]): void
  ok(test: Test): void
  fail(test: Test, err: Error): void
  bail(): void
  skip(test: Test): void
  endSuite(): void
  end(): void
}

export interface RunOptions {
  reporter?: Reporter
  bail?: boolean
  parallel?: boolean
  parallelSuites?: boolean
}

export function run(options?: RunOptions): Promise<boolean>
export function schedule(options?: RunOptions): void

export type Factory = (name: string, fn: Fn) => void

export interface Suite extends Factory {
  test(name: string, fn: Fn): void
  only(name: string, fn: Fn): void
  skip(name: string): void
  before(fn: Fn): void
  after(fn: Fn): void
  beforeEach(fn: Fn): void
  afterEach(fn: Fn): void
}

export default function suite(name: string): Suite
