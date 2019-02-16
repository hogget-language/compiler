'use strict'

var lexer = require('./src/lexer')
var parser = require('./src/parser')
var linter = require('./src/linter')
var transformer = require('./src/transformer')
var generator = require('./src/generator')
var evaluator = require('./src/evaluator')

module.exports = {
  default: compile,
  compile: compile,
  evaluate: evaluate,
  parse: parse,
  lint: lint,
  format: format
}

function parse(input) {
  var tokens = lexer(input)
  var ast = parser(tokens)
  return ast
}

function compile(input) {
  var ast = parse(input)
  var newAst = transformer('javascript', ast)
  var output = generator('javascript', newAst)
  return output
}

function evaluate(input) {
  var output = compile(input)
  var node = evaluator(output)
  return node
}

function lint(input) {
  var ast = parse(input)
  var errors = linter(ast)
  return errors
}

function format(input) {
  var ast = parse(input)
  var output = generator('hogget', ast)
  return output
}
