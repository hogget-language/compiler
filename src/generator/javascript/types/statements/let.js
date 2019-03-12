'use strict'

module.exports = {
  keyword: 'let',
  generator
}

function generator(generator, context, node) {
  const identifier = node.identifier.value
  const value = generator(generator, context, node.value)
  return `var ${identifier} = ${value}`
}
