'use strict'

const assert = require('assert')
const parser = require('./index')

describe('Parser', it => {
  it('parses polish notation function calls', () => {
    const tokens = [
      {
        type: 'paren',
        value: '('
      },
      {
        type: 'name',
        value: 'add'
      },
      {
        type: 'num',
        value: '12'
      },
      {
        type: 'num',
        value: '30'
      },
      {
        type: 'paren',
        value: ')'
      }
    ]

    const ast = parser(tokens)

    assert.deepStrictEqual(ast, {
      type: 'Program',
      body: [
        {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            value: 'add'
          },
          arguments: [
            { type: 'NumberLiteral', value: 12 },
            { type: 'NumberLiteral', value: 30 }
          ]
        }
      ]
    })
  })
})
