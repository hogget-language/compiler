'use strict'

module.exports = {
  generator,
  context
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isDec')

  return 'isDec'
}

function context() {
  return (
    'function $isDec(val) {\n' +
    "  return typeof val === 'number' && isFinite(val) && Math.floor(val) !== val;\n" +
    '}\n'
  )
}
