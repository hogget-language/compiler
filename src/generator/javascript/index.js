'use strict'

const basename = require('path').basename
const recursiveScanDir = require('../../util/fs').recursiveScanDir
const stdlib = require('./stdlib')

module.exports = {
  generator,
  postprocessor
}

const types = {}
recursiveScanDir(`${__dirname}/types`, file => {
  if (file.substring(file.length - 3) !== '.js') return false
  return true
}).forEach(file => {
  const filename = basename(file)
  types[filename.substring(0, filename.length - 3)] = require(file)
})

function generator(generator, context, node) {
  if (!types[node.type]) {
    throw new Error('Unknown AST node type: ' + node.type)
  }
  return types[node.type](generator, context, node)
}

function postprocessor(context, str) {
  if (!context.stdlib || !context.stdlib.length) return str

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
