'use strict'

const arithmetic = require('../arithmetic')

module.exports = {
  identifier: '*',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('*')
  context.stdlib.push('type')
  context.stdlib.push('isNumber')

  return 'multiply'
}

function render() {
  return arithmetic.arity2('multiply', '*')
}
