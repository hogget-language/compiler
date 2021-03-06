#!/usr/bin/env node

'use strict'

const hogget = require('./index')
const pkg = require('./package.json')
const fs = require('fs')
const EOL = require('os').EOL
const argv = process.argv
const log = function(str) {
  return process.stdout.write(str + EOL)
}

if (hasArg(argv, ['--version', '-v'])) {
  log(pkg.version)
  process.exit()
}

// Print name and version
log('Hogget, version ' + pkg.version)

// Determine mode
let mode = 'compile'
if (hasArg(argv, ['--evaluate', '-e'])) {
  mode = 'evaluate'
} else if (
  hasArg(argv, ['--lint', '-l']) &&
  !hasArg(argv, ['--format', '-f'])
) {
  mode = 'lint'
} else if (
  hasArg(argv, ['--format', '-f']) &&
  !hasArg(argv, ['--lint', '-l'])
) {
  mode = 'format'
}

const inputArg = getArgValue(argv, ['--input', '-i'])
if (!inputArg) {
  log('Error: No input file specified!')
  process.exit(1)
}
const input = fs.readFileSync(inputArg, 'utf8')

// Run mode
switch (mode) {
  case 'compile':
    var outputArg = getArgValue(argv, ['--output', '-o'])
    if (!outputArg) {
      log('Error: No output file specified!')
      process.exit(1)
    }

    log(' compiling: ' + inputArg)
    var output = hogget.compile(input)
    log(' writing: ' + outputArg)
    fs.writeFileSync(outputArg, output)
    log(' done')
    process.exit()

  case 'evaluate':
    log(' evaluating as child process')
    const node = hogget.evaluate(input)
    node.on('exit', function(code) {
      process.exit(code)
    })
    break

  case 'lint':
    log(' linting: ' + inputArg)
    const errors = hogget.lint(input)

    if (errors.length) {
      errors.forEach(error => log('[' + error.code + '] ' + error.title))
      process.exit(1)
    }

    process.stdout.write(' no errors found' + EOL)
    process.exit()

  case 'format':
    var outputArg = getArgValue(argv, ['--output', '-o'])
    if (!outputArg) {
      process.stdout.write('Error: No output file specified!' + EOL)
      process.exit(1)
    }

    process.stdout.write(' formatting: ' + inputArg + EOL)
    var output = hogget.format(input)
    log(' writing: ' + outputArg)
    fs.writeFileSync(outputArg, output)
    process.stdout.write(' done' + EOL)
    process.exit()
}

/**
 * @param {Array} argv - `process.argv`
 * @param {String} searchArg - Arguments to search for
 * @returns {Boolean}
 */
function hasArg(argv, searchArgs) {
  for (let i = 0; i < argv.length; i++) {
    if (searchArgs.indexOf(argv[i]) !== -1) {
      return true
    }
  }
  return false
}

/**
 * @param {Array} argv - `process.argv`
 * @param {Array<String>} searchArg - Arguments to search for
 * @returns {String}
 */
function getArgValue(argv, searchArgs) {
  let position = false
  for (let i = 0; i < argv.length; i++) {
    if (searchArgs.indexOf(argv[i]) !== -1) {
      position = i
      break
    }
  }
  if (
    position === false ||
    !argv[position + 1] ||
    argv[position + 1][0] === '-'
  ) {
    return false
  }
  return argv[position + 1]
}
