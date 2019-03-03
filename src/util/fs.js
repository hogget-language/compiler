'use strict'

const fs = require('fs')

module.exports = { recursiveScanDir }

function recursiveScanDir(dir, filter) {
  filter = typeof filter === 'function' ? filter : () => true

  const files = []
  fs.readdirSync(dir).forEach(file => {
    const path = `${dir}/${file}`

    if (fs.statSync(path).isDirectory())
      return files.push.apply(files, recursiveScanDir(path, filter))

    if (filter(path)) return files.push(path)
  })
  return files
}
