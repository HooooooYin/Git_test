function memoize (f) {
  var cache = {};
  return function () {
    var key = arguments.length + Array.prototype.join.call(arguments, ',');
    if (key in cache) {
      return cache[key]
    } else {
      return cache[key] = f.apply(this, arguments)
    }
  };
}

var add = function(a, b, c) {
  return a + b + c
}

var memoizedAdd = memoize(add)

console.time('use memoize')
for(var i = 0; i < 100000; i++) {
    memoizedAdd(1, 2, 3)
}
console.timeEnd('use memoize')

console.time('not use memoize')
for(var i = 0; i < 100000; i++) {
    add(1, 2, 3)
}
console.timeEnd('not use memoize')