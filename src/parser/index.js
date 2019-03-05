'use strict'

module.exports = function parser(tokens) {
  let current = 0

  function walk() {
    let token = tokens[current]
    let nextToken = tokens[current + 1]

    /**
     * Name
     */
    if (token.type === 'name') {
      current++

      return {
        type: 'Identifier',
        value: token.value
      }
    }

    /**
     * Numbers
     */
    if (token.type === 'num') {
      current++

      return {
        type: 'NumberLiteral',
        value: parseFloat(token.value, 10)
      }
    }

    /**
     * Strings
     */
    if (token.type === 'str') {
      current++

      return {
        type: 'StringLiteral',
        value: token.value
      }
    }

    /**
     * Arrays
     */
    if (token.type === 'bracket' && token.value === '[') {
      const node = {
        type: 'ArrayLiteral',
        values: []
      }

      current++
      token = tokens[current]

      while (
        token.type !== 'bracket' ||
        (token.type === 'bracket' && token.value !== ']')
      ) {
        node.values.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }

    /**
     * Call expressions
     */
    if (
      token.type === 'paren' &&
      token.value === '(' &&
      nextToken &&
      nextToken.type === 'name'
    ) {
      const node = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          value: nextToken.value
        },
        arguments: []
      }

      current += 2
      token = tokens[current]

      while (
        token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.arguments.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }

    /**
     * Expressions
     */
    if (token.type === 'paren' && token.value === '(') {
      const node = {
        type: 'Expression',
        body: []
      }

      current++
      token = tokens[current]

      while (
        token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.body.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }

    throw new SyntaxError(
      'Unexpected token `' + token.type + '` on ' + token.line + ':' + token.col
    )
  }

  const ast = {
    type: 'Program',
    body: []
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}
