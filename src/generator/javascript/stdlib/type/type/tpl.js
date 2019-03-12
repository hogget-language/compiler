function $type(val) {
  if ($isNumber(val)) return 'number'
  if ($isString(val)) return 'string'
  throw new Error('Unexpected type: ' + typeof val)
}
