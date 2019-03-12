function $floor(val) {
  if (arguments.length === 1 && $isNumber(val)) {
    return Math.floor(val)
  }
  throw new Error('`+` must be called with 1 argument')
}
