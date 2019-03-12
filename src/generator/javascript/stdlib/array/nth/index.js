'use strict'

const readFile = file => require('fs').readFileSync(file, 'utf8')

module.exports = {
  identifier: 'nth',
  generator,
  render: () => readFile(`${__dirname}/tpl.js`)
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('nth')
  context.stdlib.push('type')
  context.stdlib.push('isArray')
  context.stdlib.push('isNumber')

  return 'nth'
}
