'use strict'

const stdlib = require('../stdlib')

module.exports = function generator(generator, context, node) {
  let identifier
  if (stdlib.isStdlib(node.callee)) {
    identifier = '$' + stdlib.generator(generator, context, node.callee)
    stdlib.validator(node)
  } else {
    identifier = generator(generator, context, node.callee)
  }

  return (
    identifier +
    '(' +
    node.arguments
      .map(function(node) {
        return generator(generator, context, node)
      })
      .join(', ') +
    ')'
  )
}
