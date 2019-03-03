'use strict'

const assert = require('assert')
const lexer = require('./index')

describe('Lexer', it => {
  it('(add)', () => {
    const input = '(add)'

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '(',
        line: 1,
        col: 1
      },
      {
        type: 'name',
        value: 'add',
        line: 1,
        col: 2
      },
      {
        type: 'paren',
        value: ')',
        line: 1,
        col: 5
      }
    ])
  })

  it('(add 42)', () => {
    const input = '(add 42)'

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '(',
        line: 1,
        col: 1
      },
      {
        type: 'name',
        value: 'add',
        line: 1,
        col: 2
      },
      {
        type: 'num',
        value: '42',
        line: 1,
        col: 6
      },
      {
        type: 'paren',
        value: ')',
        line: 1,
        col: 8
      }
    ])
  })

  it('(add 13.37)', () => {
    const input = '(add 13.37)'

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '(',
        line: 1,
        col: 1
      },
      {
        type: 'name',
        value: 'add',
        line: 1,
        col: 2
      },
      {
        type: 'num',
        value: '13.37',
        line: 1,
        col: 6
      },
      {
        type: 'paren',
        value: ')',
        line: 1,
        col: 11
      }
    ])
  })

  it('(    add  42  )  ', () => {
    const input = '(    add  42  )  '

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '(',
        line: 1,
        col: 1
      },
      {
        type: 'name',
        value: 'add',
        line: 1,
        col: 6
      },
      {
        type: 'num',
        value: '42',
        line: 1,
        col: 11
      },
      {
        type: 'paren',
        value: ')',
        line: 1,
        col: 15
      }
    ])
  })

  it('(add 12 30)', () => {
    const input = '(add 12 30)'

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '(',
        line: 1,
        col: 1
      },
      {
        type: 'name',
        value: 'add',
        line: 1,
        col: 2
      },
      {
        type: 'num',
        value: '12',
        line: 1,
        col: 6
      },
      {
        type: 'num',
        value: '30',
        line: 1,
        col: 9
      },
      {
        type: 'paren',
        value: ')',
        line: 1,
        col: 11
      }
    ])
  })

  it("(add 'foo' 'bar')", () => {
    const input = "(add 'foo' 'bar')"

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '(',
        line: 1,
        col: 1
      },
      {
        type: 'name',
        value: 'add',
        line: 1,
        col: 2
      },
      {
        type: 'str',
        value: 'foo',
        line: 1,
        col: 6
      },
      {
        type: 'str',
        value: 'bar',
        line: 1,
        col: 12
      },
      {
        type: 'paren',
        value: ')',
        line: 1,
        col: 17
      }
    ])
  })

  it("(add\\n  'foo'\\n  'bar')", () => {
    const input = "(add\n  'foo'\n  'bar')"

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '(',
        line: 1,
        col: 1
      },
      {
        type: 'name',
        value: 'add',
        line: 1,
        col: 2
      },
      {
        type: 'str',
        value: 'foo',
        line: 2,
        col: 3
      },
      {
        type: 'str',
        value: 'bar',
        line: 3,
        col: 3
      },
      {
        type: 'paren',
        value: ')',
        line: 3,
        col: 8
      }
    ])
  })

  it('throws on unexpected characters', () => {
    const input = '~`!@#$%^&*+={}|;:,<>/?"'

    assert.throws(() => lexer(input))
  })
})
