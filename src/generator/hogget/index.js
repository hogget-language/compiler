'use strict'

module.exports = {
  generator,
  postprocessor
}

function generator(generator, context, node) {
  switch (node.type) {
    case 'Program':
      return (
        node.body.map(node => generator(generator, context, node)).join('\n') +
        '\n'
      )

    case 'Expression':
      return (
        '(' +
        node.body.map(node => generator(generator, context, node)).join(' ') +
        ')'
      )

    case 'CallExpression':
      return (
        '(' +
        generator(generator, context, node.callee) +
        ' ' +
        node.arguments
          .map(node => generator(generator, context, node))
          .join(' ') +
        ')'
      )

    case 'Identifier':
      return node.value

    case 'NumberLiteral':
      return node.value

    case 'StringLiteral':
      return "'" + node.value + "'"

    case 'ArrayLiteral':
      return (
        '[' +
        node.values
          .map(node => generator(generator, context, node))
          .join(', ') +
        ']'
      )

    default:
      throw new Error('Unknown AST node type: ' + node.type)
  }
}

function postprocessor(context, str) {
  return str
}
