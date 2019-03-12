'use strict'

module.exports = {
  keyword: 'ret',
  transform
}

function transform(walk, node) {
  const args = node.arguments
  if (args.length !== 1) {
    throw new Error('`ret` function must have exactly 1 arguments')
  }

  return {
    type: 'Statement',
    keyword: node.callee.value,
    value: walk(args[0])
  }
}
