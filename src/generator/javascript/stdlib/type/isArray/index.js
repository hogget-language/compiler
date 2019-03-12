'use strict'

const readFile = file => require('fs').readFileSync(file, 'utf8')

module.exports = {
  identifier: 'isArray',
  generator,
  render: () => readFile(`${__dirname}/tpl.js`)
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isArray')

  return 'isArray'
}
