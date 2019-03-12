function $__name__(a, b) {
  if (arguments.length === 2) {
    if ($isNumber(a) && $isNumber(b)) {
      return a ** b
    }
    throw new Error(
      '`**` must be called with number types, received ' +
        $type(a) +
        ' and ' +
        $type(b)
    )
  } else if (arguments.length === 1) {
    return function(b) {
      return $__name__(a, b)
    }
  }
  throw new Error('`**` must be called with either 1 or 2 arguments')
}
