'use strict'

module.exports = function parser(tokens) {
  var current = 0

  function walk() {
    var token = tokens[current]

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
    var nextToken = tokens[current + 1]
    if (token.type === 'bracket' && token.value === '[') {
      var node = {
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
    var nextToken = tokens[current + 1]
    if (
      token.type === 'paren' &&
      token.value === '(' &&
      nextToken &&
      nextToken.type === 'name'
    ) {
      var node = {
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
    var nextToken = tokens[current + 1]
    if (token.type === 'paren' && token.value === '(') {
      var node = {
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

  var ast = {
    type: 'Program',
    body: []
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}
