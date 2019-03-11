'use strict'

module.exports = {
  identifier: 'log',
  generator,
  render
}

function generator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('log')

  return 'log'
}

function render() {
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
