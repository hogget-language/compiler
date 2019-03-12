'use strict'

const resolve = require('path').resolve
const recursiveScanDir = require('../../../util/fs').recursiveScanDir

module.exports = {
  isStdlib,
  validator,
  generator,
  render
}

const stdlib = {}
recursiveScanDir(__dirname, file => {
  if (resolve(file) === __filename) return false
  if (file.substring(file.length - 3) !== '.js') return false
  if (file.substring(file.length - 6) === 'tpl.js') return false
  return true
}).forEach(file => {
  const mod = require(file)
  if (!mod.identifier) return
  stdlib[mod.identifier] = mod
  stdlib[mod.identifier].file = file
})

function isStdlib(node) {
  return node.type === 'Identifier' && stdlib[node.value]
}

function validator(node) {
  if (stdlib[node.callee.value].validator) {
    return stdlib[node.callee.value].validator(node)
  }
}

function generator(generator, context, node) {
  return stdlib[node.value].generator(generator, context, node)
}

function render(identifier) {
  if (!stdlib[identifier]) {
    throw new Error('Stdlib implementation not found: ' + identifier)
  }
  return stdlib[identifier].render()
}
