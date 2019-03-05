'use strict'

module.exports = (generator, context, node) =>
  '[' +
  node.values.map(node => generator(generator, context, node)).join(', ') +
  ']'
