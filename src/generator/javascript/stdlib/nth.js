'use strict'

module.exports = {
  identifier: 'nth',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('nth')
  context.stdlib.push('type')
  context.stdlib.push('isArray')
  context.stdlib.push('isNumber')

  return 'nth'
}

function render() {
  return (
    'function $nth(key, list) {\n' +
    '  if (arguments.length === 2) {\n' +
    '    if ($isNumber(a) && $isArray(b)) {\n' +
    '      return list[key]\n' +
    '    }\n' +
    "    throw new Error('`nth` must be called with a Number type and an Array type. Received ' + $type(a) + ' and ' + $type(b));\n" +
    '  } else if (arguments.length === 1) {\n' +
    '    return function(list) {\n' +
    '      return $nth(key, list)\n' +
    '    }\n' +
    '  }\n' +
    "  throw new Error('`+` must be called with either 1 or 2 arguments');\n" +
    '}\n'
  )
}
