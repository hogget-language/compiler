'use strict'

module.exports = {
  generator,
  context
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isInt')

  return 'isInt'
}

function context() {
  return (
    'function $isInt(val) {\n' +
    "  return typeof val === 'number' && val % 1 === 0 && isFinite(val);\n" +
    '}\n'
  )
}
