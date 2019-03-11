'use strict'

module.exports = {
  identifier: 'len',
  validator,
  generator,
  render
}

function validator(node) {
  const args = node.arguments
  if (args.length > 1) {
    throw new Error('`len` must be called with 1 argument')
  }
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('len')

  return 'len'
}

function render() {
  return 'function $len(val) {\n' + '  return val.length;\n' + '}\n'
}
