'use strict'

const readFile = file => require('fs').readFileSync(file, 'utf8')
const templates = {
  arity2: readFile(`${__dirname}/arity2.tpl.js`)
}

module.exports = { arity2 }

function arity2(name, operator) {
  return templates.arity2.replace(/__name__/g, name).replace(/\*\*/g, operator)
}
