export interface AssertionOptions {
  message?: string
  actual?: any
  expected?: any
  operator: string
  stackStartFn?: Function
}

export class AssertionError extends Error {
  constructor(options: AssertionOptions)
  code: string
  actual: any
  expected: any
  operator: string
}

export function fail(message?: string): void
export function ok(value: any, message?: string): void
export function equal(actual: any, expected: any, message?: string): void
export function notEqual(actual: any, expected: any, message?: string): void
export function deepEqual(actual: any, expected: any, message?: string): void
export function notDeepEqual(actual: any, expected: any, message?: string): void
export function deepStrictEqual(actual: any, expected: any, message?: string): void
export function notDeepStrictEqual(actual: any, expected: any, message?: string): void
export function strictEqual(actual: any, expected: any, message?: string): void
export function notStrictEqual(actual: any, expected: any, message?: string): void
export function ifError(value: any, message?: string): void
