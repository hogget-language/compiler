'use strict'

module.exports = {
  keyword: 'let',
  transform
}

function transform(walk, node) {
  const args = node.arguments
  if (args.length !== 2) {
    throw new Error('`let` function must have exactly 2 arguments')
  }
  if (args[0].type !== 'Identifier') {
    throw new Error('`let` function needs an identifier as first argument')
  }

  return {
    type: 'Statement',
    keyword: node.callee.value,
    identifier: args[0],
    value: walk(args[1])
  }
}
