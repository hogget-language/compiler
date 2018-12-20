'use strict'

module.exports = {
  generator: TypeStdlibGenerator,
  contextGenerator: TypeStdlibContextGenerator
}

function TypeStdlibGenerator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('type')
  context.stdlib.push('isInt')
  context.stdlib.push('isDec')
  context.stdlib.push('isStr')

  return 'type'
}

function TypeStdlibContextGenerator() {
  return (
    'function type(val) {\n' +
    "  if (isInt(val)) return 'int';\n" +
    "  if (isDec(val)) return 'dec';\n" +
    "  if (isStr(val)) return 'str';\n" +
    "  throw new Error('Unexpected type: ' + typeof val);\n" +
    '}\n'
  )
}