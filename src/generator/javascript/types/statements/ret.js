'use strict'

module.exports = {
  keyword: 'ret',
  generator
}

function generator(generator, context, node) {
  const value = generator(generator, context, node.value)
  return `return ${value}`
}
