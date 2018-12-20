'use strict'

module.exports = {
  generator: IsIntStdlibGenerator,
  contextGenerator: IsIntStdlibContextGenerator
}

function IsIntStdlibGenerator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isInt')

  return 'isInt'
}

function IsIntStdlibContextGenerator() {
  return (
    'function isInt(val) {\n' +
    "  return typeof val === 'number' && val % 1 === 0 && isFinite(val);\n" +
    '}\n'
  )
}
