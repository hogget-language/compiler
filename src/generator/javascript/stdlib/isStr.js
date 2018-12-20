'use strict'

module.exports = {
  generator: IsStrStdlibGenerator,
  contextGenerator: IsStrStdlibContextGenerator
}

function IsStrStdlibGenerator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isStr')

  return 'isStr'
}

function IsStrStdlibContextGenerator() {
  return (
    'function isStr(val) {\n' + "  return typeof val === 'string';\n" + '}\n'
  )
}
