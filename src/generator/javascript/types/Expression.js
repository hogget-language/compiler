'use strict'

module.exports = (generator, context, node) =>
  '(' +
  node.body.map(node => generator(generator, context, node)).join(', ') +
  ')'
