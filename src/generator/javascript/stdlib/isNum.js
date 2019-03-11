'use strict'

module.exports = {
  identifier: 'isNumber',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isNumber')

  return 'isNumber'
}

function render() {
  return (
    'function $isNumber(val) {\n' +
    "  return typeof val === 'number' && isFinite(val);\n" +
    '}\n'
  )
}
