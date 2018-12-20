'use strict'

module.exports = {
  generator: IsDecStdlibGenerator,
  contextGenerator: IsDecStdlibContextGenerator
}

function IsDecStdlibGenerator(generator, context, node) {
  if (!context.stdlib) context.stdlib = []
  context.stdlib.push('isDec')

  return 'isDec'
}

function IsDecStdlibContextGenerator() {
  return (
    'function isDec(val) {\n' +
    "  return typeof val === 'number' && isFinite(val) && Math.floor(val) !== val;\n" +
    '}\n'
  )
}
