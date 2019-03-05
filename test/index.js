'use strict'

process.cwd(`${__dirname}/../`)
const recursiveScanDir = require('../src/util/fs').recursiveScanDir

module.exports = { run }

function run(dir, ext) {
  const files = recursiveScanDir(`${process.cwd()}/${dir}`, hasExt(ext))
  report(runSuites(getSuites(files)))
}

function runSuites(suites) {
  Object.keys(suites).forEach(key => {
    const suite = suites[key]
    suite.tests.forEach(test => {
      try {
        test.run()
        test.err = false
      } catch (err) {
        test.err = err
      }
    })
  })
  return suites
}

function report(suites) {
  let testCount = 0
  let errorCount = 0

  log('Report')
  Object.keys(suites).forEach(key => {
    const suite = suites[key]
    log(`\n  ${suite.name}`)
    suite.tests.forEach(test => {
      testCount++
      if (test.err) errorCount++
      const status = test.err ? red('×') : green('✔')
      log(`${status} ${test.name}`, 4)
    })
  })

  if (!testCount) return log('\nNo tests found!')

  if (!errorCount) return
  log('\n\nError report')
  Object.keys(suites).forEach(key => {
    const suite = suites[key]
    log(`\n  ${suite.name}\n`)
    suite.tests.forEach(test => {
      if (!test.err) return
      log(red(test.name), 4)
      if (test.err.stack) {
        log(test.err.stack + '\n', 6)
      } else {
        log(test.err + '\n', 6)
      }
    })
  })

  if (errorCount) process.exit(1)
}

function getSuites(files) {
  const suites = {}
  files.forEach(file => getSuite(suites, file))
  return suites
}

function getSuite(suites, file) {
  const newSuites = {}
  global.describe = makeDescribeFn(newSuites)

  try {
    require(file)
  } catch (err) {
    log(`Error while loading file: ${file}\n`)
    throw err
  }

  for (const id in newSuites) {
    const suite = newSuites[id]
    suite.load(makeItFn(suite))
    suites[id] = suite
  }
}

function makeDescribeFn(suites) {
  return (name, fn) => {
    suites[name] = {
      name,
      tests: [],
      load: fn
    }
  }
}

function makeItFn(suite) {
  return (test, fn) => {
    suite.tests.push({
      name: test,
      run: fn
    })
  }
}

function hasExt(ext) {
  return file => file.substring(file.length - ext.length) === ext
}

function red(str) {
  return color(str, 91)
}

function green(str) {
  return color(str, 92)
}

function color(str, colorCode) {
  const open = '\u001b[' + colorCode + 'm'
  const close = '\u001b[39m'
  return open + str + close
}

function indent(str, len) {
  const ind = ' '.repeat(len)
  return ind + str.replace(/\n/g, '\n' + ind)
}

function log(str, len) {
  len = typeof len === 'number' ? len : 0
  process.stdout.write(indent(String(str), len) + '\n')
}
