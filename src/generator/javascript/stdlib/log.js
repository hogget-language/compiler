'use strict'

module.exports = {
  generator: LogStdlibGenerator,
  contextGenerator: LogStdlibContextGenerator
}

function LogStdlibGenerator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('log')

  return 'log'
}

function LogStdlibContextGenerator() {
  return (
    'function log() {\n' +
    "  var str = '';\n" +
    '  for (var i = 0; i < arguments.length; i++) {\n' +
    '    str += arguments[i].toString();\n' +
    '  }\n' +
    '  process.stdout.write(str);\n' +
    '}\n'
  )
}
