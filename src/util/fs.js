'use strict'

const fs = require('fs')

module.exports = { recursiveScanDir }

function recursiveScanDir(dir, filter = () => true) {
  const files = []
  fs.readdirSync(dir).forEach(file => {
    const path = `${dir}/${file}`
    if (fs.statSync(path).isDirectory())
      return files.push(...recursiveScanDir(path, filter))
    if (filter(path)) return files.push(path)
  })
  return files
}
