'use strict'

const readFile = file => require('fs').readFileSync(file, 'utf8')

module.exports = {
  identifier: 'isNumber',
  generator,
  render: () => readFile(`${__dirname}/tpl.js`)
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isNumber')

  return 'isNumber'
}
