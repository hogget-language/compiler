'use strict'

var fs = require('fs')

module.exports = {
  isStdlib: isStdlib,
  validator: validator,
  generator: generator,
  context: context
}

var stdlib = {}
fs.readdirSync(__dirname).forEach(function(file) {
  if (file === 'index.js') return
  if (file.substring(file.length - 3) === '.js') {
    stdlib[file.substring(0, file.length - 3)] = require('./' + file)
  }
})

function isStdlib(node) {
  return node.type === 'Identifier' && stdlib[node.name]
}

function validator(node) {
  if (stdlib[node.callee.name].validator) {
    return stdlib[node.callee.name].validator(node)
  }
}

function generator(generator, context, node) {
  return stdlib[node.name].generator(generator, context, node)
}

function context(identifier) {
  if (!stdlib[identifier]) {
    throw new Error('Stdlib implementation not found: ' + identifier)
  }
  return stdlib[identifier].contextGenerator()
}
