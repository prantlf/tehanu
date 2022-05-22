const test = tehanu('sum'),
      { equal } = tehanuTeas

test('one number', () => equal(sum(1), 1))
test('two numbers', () => equal(sum(1, 2), 3))
