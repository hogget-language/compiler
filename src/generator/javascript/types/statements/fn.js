'use strict'

module.exports = {
  keyword: 'fn',
  generator
}

function generator(generator, context, node) {
  const identifier = node.identifier

  const args = node.arguments.map(node => generator(generator, context, node))
  const argsStr = args.join(', ')

  context.indent = (context.indent || 0) + 1
  const indent = '\n' + ' '.repeat(context.indent * 2)
  const body = node.body.map(node => generator(generator, context, node))

  context.indent--
  const indentAfter = '\n' + ' '.repeat(context.indent * 2)
  const bodyStr = indent + body.join(indent) + indentAfter

  return `function ${identifier}(${argsStr}) {${bodyStr}}`
}
