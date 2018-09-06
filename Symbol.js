(function () {
  var root = this;

  var generateName = (function () {
    var postfix = 0;
    return function (descString) {
      postfix++;
      return '@@' + descString + '_' + postfix;
    }
  }())

  var SymbolPolyfill = function Symbol (description) {
    //Symbol 函数不能使用new命令
    if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor');

    // 如果参数未定义，则设为undefined；是一个对象，则先转化为字符串，然后生成一个symbol。
    var descString = description === undefined ? undefined : String(description);

    var symbol = Object.create({
      toString: function () {
        return this.__Name__;
      },
      valueOf: function() {
        throw new Error('Cannot convert a Symbol value');
      }
    });

    var forMap = {};

    Object.defineProperties(symbol, {
      '__Description__': {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '__Name__': {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false
      },
      'for': {
        value: function (description) {
          var descString = description === undefined ? undefined : String(description);
          return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
        },
        writable: true,
        enumerable: false,
        configurable: true
      },
      'keyFor': {
        value: function (symbol) {
          for (var key in forMap) {
            if (forMap[key] === symbol) return key;
          }
        },
        writable: true,
        enumerable: false,
        configurable: true
      }
    });

    return symbol;
  }

  root.SymbolPolyfill = SymbolPolyfill;

  var a = SymbolPolyfill('foo');
  var b = SymbolPolyfill('foo');

  var o = {};
  o[a] = 1;
  o[b] = 2;
  console.log(a instanceof SymbolPolyfill);
} ())