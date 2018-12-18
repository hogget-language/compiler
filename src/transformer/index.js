'use strict'

module.exports = function transformer(target, ast) {
  switch (target) {
    case 'javascript':
      return require('./javascript')(ast)
  }
  throw new Error('Unknown target: ' + target)
}
