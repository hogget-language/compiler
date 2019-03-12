'use strict'

module.exports = {
  keyword: 'fn',
  transform
}

function transform(walk, node) {
  const args = node.arguments
  if (args.length < 3) {
    throw new Error('`fn` function must have at least 3 arguments')
  }

  // Function name
  if (args[0].type !== 'Identifier') {
    throw new Error('`fn` function needs an identifier as first argument')
  }

  // Function arguments
  if (args[1].type !== 'ArrayLiteral') {
    throw new Error(
      '`fn` function needs an array of arguments as second argument'
    )
  }
  args[1].values.forEach(node => {
    if (node.type !== 'Identifier') {
      throw new Error('`fn` function needs only identifiers arguments')
    }
  })

  return {
    type: 'Statement',
    keyword: 'fn',
    identifier: args[0].value,
    arguments: args[1].values,
    body: args.slice(2).map(walk)
  }
}
