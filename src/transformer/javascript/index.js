'use strict'

const transformers = [require('./statements')]

module.exports = function transformer(ast) {
  return transformers.reduce((ast, transformer) => transformer(ast), ast)
}
