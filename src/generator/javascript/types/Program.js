'use strict'

module.exports = function ProgramGenerator(generator, context, node) {
  return (
    node.body
      .map(function(node) {
        return generator(generator, context, node)
      })
      .join('\n') + '\n'
  )
}
