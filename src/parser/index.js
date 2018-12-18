module.exports = function parser(tokens) {
  var current = 0

  function walk() {
    var token = tokens[current]

    if (token.type === 'int') {
      current++

      return {
        type: 'IntLiteral',
        value: token.value
      }
    }

    if (token.type === 'str') {
      current++

      return {
        type: 'StrLiteral',
        value: token.value
      }
    }

    var nextToken = tokens[current + 1]
    if (
      token.type === 'name' &&
      nextToken &&
      nextToken.type === 'paren' &&
      nextToken.value === '('
    ) {
      var node = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: token.value
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

    throw new SyntaxError('Unexpected token ' + token.type)
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
