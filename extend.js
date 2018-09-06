function isFunction (obj) {
  return typeof(obj) === 'function';
}

function isPlainObject(obj) {
  var proto, Ctor;
  
  if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
    return false;
  }

  proto = Object.getPrototypeOf(obj);

  if (!proto) {
    return true;
  }

  Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;

  return typeof(Ctor) === 'function' && Object.prototype.hasOwnProperty.toString.call(Ctor) === Object.prototype.hasOwnProperty.toString.call(Object);
}

function extend () {
  var name, options, copy, src, clone, copyIsArray;
  var deep = false;
  var length = arguments.length;
  var target = arguments[0] || {};
  var i = 1

  if (typeof(target) === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i++;
  }

  if (typeof target !== "object" && !isFunction(target)){
    target = {}
  }

  for (; i < length; i++) {
    options = arguments[i];
    if (options) {
      for (name in options) {
        src = target[name]
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src)? src : []
          } else {
            clone = src && isPlainObject(src)? src : {}
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    } 
  }

  return target;
}

var obj1 = {
  a: 1,
  b: {
      c: 2
  }
}

var obj2 = {
  b: {
      c: [5],

  }
}

var d = extend(true, obj1, obj2)
console.log(d);
