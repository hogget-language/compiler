'use strict'

module.exports = function generator(target, ast) {
  var generator
  switch (target) {
    case 'javascript':
      generator = require('./javascript')
      break
    case 'hogget':
      generator = require('./hogget')
      break
    default:
      throw new Error('Unknown target: ' + target)
  }

  const context = {}
  const output = generator.generator(generator.generator, context, ast)
  return generator.postprocessor(context, output)
}
