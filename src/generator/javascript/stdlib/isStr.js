'use strict'

module.exports = {
  generator,
  context
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isStr')

  return 'isStr'
}

function context() {
  return (
    'function $isStr(val) {\n' + "  return typeof val === 'string';\n" + '}\n'
  )
}
