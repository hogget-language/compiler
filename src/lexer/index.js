'use strict'

module.exports = function lexer(input) {
  var current = 0
  var tokens = []

  while (current < input.length) {
    var char = input[current]

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })

      current++
      continue
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      })
      current++
      continue
    }

    var WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    var NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      var value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'int', value })

      continue
    }

    if (char === '"') {
      var value = ''

      char = input[++current]

      while (char !== '"') {
        value += char
        char = input[++current]
      }

      char = input[++current]

      tokens.push({ type: 'str', value })

      continue
    }

    var LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      var value = ''

      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'name', value })

      continue
    }

    throw new SyntaxError('Unexpected character: ' + char)
  }

  return tokens
}
