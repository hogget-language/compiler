'use strict'

const NEWLINE = '\n'
const WHITESPACE = /\s/
const NUMBERS_START = /[0-9]/
const NUMBERS = /[0-9\.]/
const LETTERS = /[a-z\+\-\*\/\<\>\=]/i

module.exports = function lexer(input) {
  let line = 1
  let col = 1
  let current = 0
  const tokens = []

  while (current < input.length) {
    let char = input[current]

    /**
     * Parens: ()
     */
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
        line,
        col
      })

      current++, col++
      continue
    }
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
        line,
        col
      })

      current++, col++
      continue
    }

    /**
     * Brackets: []
     */
    if (char === '[') {
      tokens.push({
        type: 'bracket',
        value: '[',
        line,
        col
      })

      current++, col++
      continue
    }
    if (char === ']') {
      tokens.push({
        type: 'bracket',
        value: ']',
        line,
        col
      })

      current++, col++
      continue
    }

    /**
     * Newlines
     */
    if (char === NEWLINE) {
      current++, line++, (col = 1)
      continue
    }

    /**
     * Whitespace
     */
    if (WHITESPACE.test(char)) {
      current++, col++
      continue
    }

    /**
     * Comments
     */
    if (char === ';') {
      char = input[++current]
      while (char !== NEWLINE) {
        char = input[++current]
      }

      char = input[++current]

      line++, (col = 1)
      continue
    }

    /**
     * Number
     */
    if (NUMBERS_START.test(char)) {
      let value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }

      if (char === '.') {
        throw new SyntaxError('Unexpected character: ' + char)
      }

      tokens.push({
        type: 'num',
        value,
        line,
        col
      })

      col += value.length
      continue
    }

    /**
     * Strings
     */
    if (char === "'") {
      let value = ''

      char = input[++current]

      while (char !== "'") {
        value += char
        char = input[++current]
      }

      char = input[++current]

      tokens.push({
        type: 'str',
        value,
        line,
        col
      })

      col += value.length + 2
      continue
    }

    /**
     * Names
     */
    if (LETTERS.test(char)) {
      let value = ''

      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({
        type: 'name',
        value,
        line,
        col
      })

      col += value.length
      continue
    }

    throw new SyntaxError(
      'Unexpected character: `' + char + '` on ' + line + ':' + current
    )
  }

  return tokens
}
