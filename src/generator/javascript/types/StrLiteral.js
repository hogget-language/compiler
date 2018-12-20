'use strict'

module.exports = function StrLiteralGenerator(generator, context, node) {
  return "'" + node.value + "'"
}
