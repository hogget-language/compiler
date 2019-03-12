'use strict'

const basename = require('path').basename
const recursiveScanDir = require('../../../util/fs').recursiveScanDir

module.exports = transformer

const keywords = []
const transformers = {}
recursiveScanDir(`${__dirname}`, file => {
  if (file === __filename) return false
  if (file.substring(file.length - 3) !== '.js') return false
  return true
}).forEach(file => {
  const mod = require(file)
  keywords.push(mod.keyword)
  transformers[mod.keyword] = mod.transform
})

function transformer(ast) {
  return walk(ast)
}

function walk(node) {
  switch (node.type) {
    case 'CallExpression':
      if (isStatement(node)) {
        return transformStatement(node)
      }
      node.arguments = node.arguments.map(walk)
      return node

    case 'Program':
    case 'Expression':
      node.body = node.body.map(walk)
      return node

    case 'ArrayLiteral':
      node.values = node.values.map(walk)
      return node

    case 'Identifier':
    case 'NumberLiteral':
    case 'StringLiteral':
      return node

    default:
      throw new Error('Unknown AST node type: ' + node.type)
  }
}

function isStatement(node) {
  return keywords.indexOf(node.callee.value) !== -1
}

function transformStatement(node) {
  return transformers[node.callee.value](walk, node)
}
