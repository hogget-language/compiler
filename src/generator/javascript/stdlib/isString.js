'use strict'

module.exports = {
  identifier: 'isString',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isString')

  return 'isString'
}

function render() {
  return (
    'function $isString(val) {\n' +
    "  return typeof val === 'string';\n" +
    '}\n'
  )
}
