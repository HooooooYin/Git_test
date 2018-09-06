function equal (a, b) {
  if (a === b) return a !== 0 || 1/a === 1/b;

  if (a == null || b == null) return false;

  if (a !== a) return b !== b;

  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

  return deepEq(a, b);
}

var toString = Object.prototype.toString;

function deepEq (a, b) {
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b;
    case '[object Number]':
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / +b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }
}