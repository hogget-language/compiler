'use strict'

module.exports = {
  identifier: '+',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('+')
  context.stdlib.push('type')
  context.stdlib.push('isNumber')

  return 'plus'
}

function render() {
  return (
    'function $plus(a, b) {\n' +
    '  if (arguments.length === 2) {\n' +
    '    if ($isNumber(a) && $isNumber(b)) {\n' +
    '      return a + b\n' +
    '    }\n' +
    "    throw new Error('`+` must be called with number types, received ' + $type(a) + ' and ' + $type(b));\n" +
    '  } else if (arguments.length === 1) {\n' +
    '    return function(b) {\n' +
    '      return $plus(a, b)\n' +
    '    }\n' +
    '  }\n' +
    "  throw new Error('`+` must be called with either 1 or 2 arguments');\n" +
    '}\n'
  )
}
