const has = Object.prototype.hasOwnProperty,
      keys = Object.keys

function deepCompare(left, right, deepOperation) {
  let ctor
  if (left && right && (ctor = left.constructor) === right.constructor) {
    if (ctor === Array) {
      let length
      if ((length = left.length) !== right.length) return false

      while (length) {
        --length
        if (!deepOperation(left[length], right[length])) return false
      }
      return true
    }

    if (!ctor || typeof left === 'object') {
      let length = 0
      for (const prop in left) {
        if (has.call(left, prop)) {
          if (!has.call(right, prop)) return false
          ++length
        }
        if (!(prop in right && deepOperation(left[prop], right[prop]))) return false
      }
      return keys(right).length === length
    }
  }

  return left !== left && right !== right
}

export function deepEqual(left, right) {
  return left == right || deepCompare(left, right, deepEqual)
}

export function deepStrictEqual(left, right) {
  return left === right || deepCompare(left, right, deepStrictEqual)
}
