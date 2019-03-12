'use strict'

const arithmetic = require('../arithmetic')

module.exports = {
  identifier: '/',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('type')
  context.stdlib.push('isNumber')

  return 'divide'
}

function render() {
  return arithmetic.arity2('divide', '/')
}
