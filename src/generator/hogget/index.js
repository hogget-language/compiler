'use strict'

module.exports = {
  generator: generator,
  postprocessor: postprocessor
}

function generator(generator, context, node) {
  switch (node.type) {
    case 'Program':
      return (
        node.body
          .map(function(node) {
            return generator(generator, context, node)
          })
          .join('\n') + '\n'
      )

    case 'ExpressionStatement':
      return generator(generator, context, node.expression) + ';\n'

    case 'CallExpression':
      return (
        generator(generator, context, node.callee) +
        '(' +
        node.arguments
          .map(function(node) {
            return generator(generator, context, node)
          })
          .join(' ') +
        ')'
      )

    case 'Identifier':
      return node.name

    case 'IntLiteral':
      return node.value

    case 'StrLiteral':
      return "'" + node.value + "'"

    default:
      throw new Error('Unknown AST node type: ' + node.type)
  }
}

function postprocessor(context, str) {
  return str
}
