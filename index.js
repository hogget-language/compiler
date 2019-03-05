'use strict'

const lexer = require('./src/lexer')
const parser = require('./src/parser')
const linter = require('./src/linter')
const transformer = require('./src/transformer')
const generator = require('./src/generator')
const evaluator = require('./src/evaluator')

module.exports = {
  default: compile,
  compile: compile,
  evaluate: evaluate,
  parse: parse,
  lint: lint,
  format: format
}

function parse(input) {
  const tokens = lexer(input)
  const ast = parser(tokens)
  return ast
}

function compile(input) {
  const ast = parse(input)
  const newAst = transformer('javascript', ast)
  const output = generator('javascript', newAst)
  return output
}

function evaluate(input) {
  const output = compile(input)
  const node = evaluator(output)
  return node
}

function lint(input) {
  const ast = parse(input)
  const errors = linter(ast)
  return errors
}

function format(input) {
  const ast = parse(input)
  const output = generator('hogget', ast)
  return output
}
