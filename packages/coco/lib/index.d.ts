export interface Test {
  readonly name: string
}

export function start(): void
export function startSuite(name: string, tests: Test[]): void
export function ok(test: Test): void
export function fail(test: Test, err: Error): void
export function bail(): void
export function skip(test: Test): void
export function endSuite(): void
export function end(): void
