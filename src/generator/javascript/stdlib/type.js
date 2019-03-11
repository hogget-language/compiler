'use strict'

module.exports = {
  identifier: 'type',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isInt')
  context.stdlib.push('isDec')
  context.stdlib.push('isString')

  return 'type'
}

function render() {
  return (
    'function $type(val) {\n' +
    "  if ($isNumber(val)) return 'number';\n" +
    "  if ($isString(val)) return 'string';\n" +
    "  throw new Error('Unexpected type: ' + typeof val);\n" +
    '}\n'
  )
}
