'use strict'

const resolve = require('path').resolve
const recursiveScanDir = require('../../../util/fs').recursiveScanDir

module.exports = generator

const statements = {}
recursiveScanDir(`${__dirname}/statements`, file => {
  if (resolve(file) === __filename) return false
  if (file.substring(file.length - 3) !== '.js') return false
  return true
}).forEach(file => {
  const mod = require(file)
  if (!mod.keyword) return
  statements[mod.keyword] = mod.generator
})

function generator(generator, context, node) {
  if (!statements[node.keyword]) {
    throw new Error('Unknown AST Statement keyword: ' + node.keyword)
  }

  return statements[node.keyword](generator, context, node)
}
