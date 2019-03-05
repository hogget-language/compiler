'use strict'

module.exports = {
  validator,
  generator,
  context
}

function validator(node) {
  const args = node.arguments
  if (args.length !== 2) {
    throw new Error('add() must be called with 2 arguments')
  }
  if (args[0].type === 'IntLiteral' && args[1].type !== 'IntLiteral') {
    throw new Error(
      'add() must be called with equal types, received ' +
        args[0].type +
        ' and ' +
        args[1].type
    )
  }
  if (args[0].type === 'StrLiteral' && args[1].type !== 'StrLiteral') {
    throw new Error(
      'add() must be called with equal types, received ' +
        args[0].type +
        ' and ' +
        args[1].type
    )
  }
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('add')
  context.stdlib.push('type')
  context.stdlib.push('isInt')
  context.stdlib.push('isDec')
  context.stdlib.push('isStr')

  return 'add'
}

function context() {
  return (
    'function $add(a, b) {\n' +
    '  if (arguments.length === 2) {\n' +
    '    if (($isInt(a) && $isInt(b)) || ($isDec(a) && $isDec(b)) || ($isStr(a) && $isStr(b))) {\n' +
    '      return a + b\n' +
    '    }\n' +
    "    throw new Error('add() must be called with equal types, received ' + $type(a) + ' and ' + $type(b))\n" +
    '  } else if (arguments.length === 1) {\n' +
    '    return function(b) {\n' +
    '      return $add(a, b)\n' +
    '    }\n' +
    '  }\n' +
    "  throw new Error('add() must be called with either 1 or 2 arguments')\n" +
    '}\n'
  )
}
