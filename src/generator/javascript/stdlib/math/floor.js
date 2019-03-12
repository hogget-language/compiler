'use strict'

const readFile = file => require('fs').readFileSync(file, 'utf8')

module.exports = {
  identifier: 'floor',
  validator,
  generator,
  render: () => readFile(`${__dirname}/tpl.js`)
}

function validator(node) {
  const args = node.arguments
  if (args.length !== 1) {
    throw new Error('`floor` must be called with 1 argument')
  }
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('floor')
  context.stdlib.push('isNumber')

  return 'floor'
}
