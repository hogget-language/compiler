'use strict'

var child_process = require('child_process')

module.exports = function evaluator(code) {
  // Spawn new Node.js process
  var options = { stdio: [null, 1, 2] }
  var node = child_process.spawn(process.execPath, [], options)

  // Execute code by sending it to Node.js
  node.stdin.setEncoding('utf-8')
  node.stdin.write(code)
  node.stdin.end()

  // Return ChildProcess
  return node
}
