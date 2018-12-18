module.exports = function generator(node) {
  switch (node.type) {
    case 'Program':
      return node.body.map(generator).join('\n') + '\n'

    case 'ExpressionStatement':
      return generator(node.expression) + ';\n'

    case 'CallExpression':
      return (
        generator(node.callee) +
        '(' +
        node.arguments.map(generator).join(' ') +
        ')'
      )

    case 'Identifier':
      return node.name

    case 'IntLiteral':
      return node.value

    case 'StrLiteral':
      return '"' + node.value + '"'

    default:
      throw new Error('Unknown AST node type: ' + node.type)
  }
}
