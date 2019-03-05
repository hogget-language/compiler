'use strict'

module.exports = (generator, context, node) =>
  node.body
    .map(function(node) {
      return generator(generator, context, node)
    })
    .join('\n') + '\n'
