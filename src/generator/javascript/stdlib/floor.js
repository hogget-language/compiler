'use strict'

module.exports = {
  identifier: 'floor',
  validator,
  generator,
  render
}

function validator(node) {
  const args = node.arguments
  if (args.length !== 1) {
    throw new Error('`floor` must be called with 1 argument')
  }
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('type')
  context.stdlib.push('isNumber')

  return 'floor'
}

function render() {
  return (
    'function $floor(val) {\n' +
    '  if (arguments.length === 1 && $isNumber(val)) {\n' +
    '    return Math.floor(val);\n' +
    '  }\n' +
    "  throw new Error('`+` must be called with 1 argument');\n" +
    '}\n'
  )
}
