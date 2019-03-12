function $nth(key, list) {
  if (arguments.length === 2) {
    if ($isNumber(a) && $isArray(b)) {
      return list[key]
    }
    throw new Error(
      '`nth` must be called with a Number type and an Array type. Received ' +
        $type(a) +
        ' and ' +
        $type(b)
    )
  } else if (arguments.length === 1) {
    return function(list) {
      return $nth(key, list)
    }
  }
  throw new Error('`nth` must be called with either 1 or 2 arguments')
}
