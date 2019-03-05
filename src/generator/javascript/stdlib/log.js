'use strict'

module.exports = {
  generator,
  context
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('log')

  return 'log'
}

function context() {
  return (
    'function $log() {\n' +
    "  var str = '';\n" +
    '  for (var i = 0; i < arguments.length; i++) {\n' +
    '    str += arguments[i].toString();\n' +
    '  }\n' +
    '  process.stdout.write(str);\n' +
    '}\n'
  )
}
