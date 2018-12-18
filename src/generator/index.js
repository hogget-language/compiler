'use strict'

module.exports = function generator(target, ast) {
  switch (target) {
    case 'javascript':
      return require('./javascript')(ast)
    case 'hogget':
      return require('./hogget')(ast)
  }
  throw new Error('Unknown target: ' + target)
}
