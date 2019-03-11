'use strict'

module.exports = {
  identifier: 'isArray',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isArray')

  return 'isArray'
}

function render() {
  return 'function $isArray(val) {\n' + '  return Array.isArray(val);\n' + '}\n'
}
