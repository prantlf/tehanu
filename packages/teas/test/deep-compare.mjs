import suite from 'tehanu'
import { strictEqual as is } from 'assert'
import { deepEqual, deepStrictEqual } from '../src/deep-compare.mjs'

const same = (left, right) => is(deepStrictEqual(left, right), true),
      different = (left, right) => is(deepStrictEqual(left, right), false)

const equal = suite('deepEqual')

equal('is function', () => is(typeof deepEqual, 'function'))
equal('accepts equals', () => is(deepEqual({a:1}, {a:'1'}), true))

const strictEqual = suite('deepStrictEqual: export')

strictEqual('is function', () => is(typeof deepStrictEqual, 'function'))

const scalars = suite('deepStrictEqual: scalars')

scalars('work', () => {
  same(1, 1)
  different(1, 2)
  different(1, [])
  different(1, '1')
  same(Infinity, Infinity)
  different(Infinity, -Infinity)
  different(NaN, undefined)
  different(NaN, null)
  same(NaN, NaN)
  different(1, -1)
  same(0, -0)

  same(null, null)
  same(void 0, undefined)
  same(undefined, undefined)
  different(null, undefined)
  different('', null)
  different(0, null)

  same(true, true)
  same(false, false)
  different(true, false)
  different(0, false)
  different(1, true)

  same('a', 'a')
  different('a', 'b')
})

const objects = suite('deepStrictEqual: objects')

objects('with prototype', () => {
  same({}, {})
  same({ a:1, b:2 }, { a:1, b:2 })
  same({ b:2, a:1 }, { a:1, b:2 })

  different({ a:1, b:2, c:[] }, { a:1, b:2 })
  different({ a:1, b:2 }, { a:1, b:2, c:[] })
  different({ a:1, c:3 }, { a:1, b:2 })

  same({ a:[{ b:1 }] }, { a:[{ b:1 }] })
  different({ a:[{ b:2 }] }, { a:[{ b:1 }] })
  different({ a:[{ c:1 }] }, { a:[{ b:1 }] })

  different([], {})
  different({}, [])
  different({}, null)
  different({}, undefined)

  different({ a:void 0 }, {})
  different({}, { a:undefined })
  different({ a:undefined }, { b:undefined })
})

objects('without prototype', () => {
  const foo = Object.create(null)
  const bar = Object.create(null)
  same(foo, bar)

  foo.hello = 'world'
  different(foo, bar)
})

const arrays = suite('deepStrictEqual: arrays')

arrays('work', () => {
  same([], [])
  same([1,2,3], [1,2,3])
  different([1,2,4], [1,2,3])
  different([1,2], [1,2,3])

  same([{ a:1 }, { b:2 }], [{ a:1 }, { b:2 }])
  different([{ a:2 }, { b:2 }], [{ a:1 }, { b:2 }])

  different({ '0':0, '1':1, length:2 }, [0, 1])
})

const functions = suite('deepStrictEqual: functions')

functions('work', () => {
  let foo = () => {}
  let bar = () => {}

  same(foo, foo)
  different(foo, bar)
  different(foo, () => {})
})

const classes = suite('deepStrictEqual: classes')

classes('simple', () => {
  class Test {}
  same(new Test, new Test)
})

classes('modified prototype', () => {
  function Test () {}
  Test.prototype.val = 42

  same(new Test, new Test)
})

classes('constructor properties', () => {
  function Test (num) {
    this.value = num
  }

  Test.prototype.val = 42

  same(new Test(123), new Test(123))
  different(new Test(0), new Test(123))
})

classes('constructor properties :: class', () => {
  class Test {
    constructor(num) {
      this.value = num
    }
  }

  same(new Test, new Test)
  same(new Test(123), new Test(123))
  different(new Test, new Test(123))
})

classes('constructor properties :: defaults', () => {
  class Test {
    constructor(num = 123) {
      this.value = num
    }
  }

  same(new Test(456), new Test(456))
  same(new Test(123), new Test)
})

classes('accessors', () => {
  class Test {
    get val() {
      return 42
    }
  }

  same(new Test, new Test)
})

classes('values but not prototype', () => {
  class Item {
    constructor() {
      this.foo = 1
      this.bar = 2
    }
  }

  const hello = new Item
  const world = {
    foo: 1,
    bar: 2,
  }

  is(
    JSON.stringify(hello),
    JSON.stringify(world)
  )

  different(hello, world)

  hello.foo = world.foo
  hello.bar = world.bar

  different(hello, world)
})

const kitchen = suite('deepStrictEqual: kitchen')

kitchen('kitchen sink', () => {
  same({
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
      subProp1: 'sub value1',
      subProp2: {
        subSubProp1: 'sub sub value1',
        subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
      }
    },
    prop5: 1000
  }, {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop4: {
      subProp2: {
        subSubProp1: 'sub sub value1',
        subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
      },
      subProp1: 'sub value1'
    }
  })
})
