'use strict'

module.exports = function ExpressionStatementGenerator(
  generator,
  context,
  node
) {
  return generator(generator, context, node.expression) + ';\n'
}
