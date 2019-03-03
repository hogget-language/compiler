'use strict'

module.exports = function ExpressionGenerator(generator, context, node) {
  return (
    '(' +
    node.body.map(node => generator(generator, context, node)).join(', ') +
    ')'
  )
}
