'use strict'

const fs = require('fs')
const stdlib = require('./stdlib')

module.exports = {
  generator,
  postprocessor
}

const types = {}
fs.readdirSync(__dirname + '/types').forEach(function(file) {
  if (file.substring(file.length - 3) === '.js') {
    types[file.substring(0, file.length - 3)] = require('./types/' + file)
  }
})

function generator(generator, context, node) {
  if (!types[node.type]) {
    throw new Error('Unknown AST node type: ' + node.type)
  }
  return types[node.type](generator, context, node)
}

function postprocessor(context, str) {
  if (!context.stdlib.length) return str

  // Generate stdlib implementations
  const stdlibStr = context.stdlib
    .reduce(unique, [])
    .sort()
    .map(identifier => stdlib.render(identifier))
    .join('')

  // Prepend stdlib implementations
  return stdlibStr + str
}

function unique(acc, curr) {
  if (acc.indexOf(curr) === -1) acc.push(curr)
  return acc
}
