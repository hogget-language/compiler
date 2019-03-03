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
        value: '('
      },
      {
        type: 'name',
        value: 'add'
      },
      {
        type: 'paren',
        value: ')'
      }
    ])
  })

  it('(add 42)', () => {
    const input = '(add 42)'

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '('
      },
      {
        type: 'name',
        value: 'add'
      },
      {
        type: 'int',
        value: '42'
      },
      {
        type: 'paren',
        value: ')'
      }
    ])
  })

  it('(    add  42  )  ', () => {
    const input = '(    add  42  )  '

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '('
      },
      {
        type: 'name',
        value: 'add'
      },
      {
        type: 'int',
        value: '42'
      },
      {
        type: 'paren',
        value: ')'
      }
    ])
  })

  it('(add 12 30)', () => {
    const input = '(add 12 30)'

    const result = lexer(input)
    assert.deepStrictEqual(result, [
      {
        type: 'paren',
        value: '('
      },
      {
        type: 'name',
        value: 'add'
      },
      {
        type: 'int',
        value: '12'
      },
      {
        type: 'int',
        value: '30'
      },
      {
        type: 'paren',
        value: ')'
      }
    ])
  })

  it('(add ~)', () => {
    const input = '(add ~)'

    assert.throws(() => lexer(input))
  })
})
