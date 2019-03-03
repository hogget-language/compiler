'use strict'

module.exports = function ArrayLiteralGenerator(generator, context, node) {
  return (
    '[' +
    node.values.map(node => generator(generator, context, node)).join(', ') +
    ']'
  )
}
