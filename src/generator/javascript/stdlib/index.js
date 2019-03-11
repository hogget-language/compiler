'use strict'

const fs = require('fs')

module.exports = {
  isStdlib,
  validator,
  generator,
  render
}

const stdlib = {}
fs.readdirSync(__dirname).forEach(function(file) {
  if (file === 'index.js') return
  if (file.substring(file.length - 3) === '.js') {
    const mod = require('./' + file)
    stdlib[mod.identifier] = mod
  }
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
