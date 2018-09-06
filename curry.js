// function sub_curry (fn) { // 实际上是用作先保存部分参数，然后返回一个接收剩余参数再回调的方法
//   var args = [].slice.call(arguments, 1); // 传入sub_curry参数
//   return function () {
//     return fn.apply(this, args.concat([].slice.call(arguments))); // 传入返回函数的参数
//   }
// }

// function curry (fn, length) {
//   length = length || fn.length;

//   var slice = Array.prototype.slice;

//   return function () {
//     if (arguments.length < length) { // 实际上只传了部分参数，然后通过sub_curry方法把部分参数先传入，等待之后的参数
//       console.log('if', length - arguments.length);
//       var combined = [fn].concat(slice.call(arguments)); // 把返回函数的参数加到参数数组
//       return curry(sub_curry.apply(fn, combined), length - arguments.length);
//     } else {
//       console.log('else');
//       return fn.apply(this, arguments); // 实际执行步骤
//     }
//   }
// }

// var fn = curry(function(a, b, c) {
//   return [a, b, c];
// });

// console.log(fn("a", "b", "c")) // ["a", "b", "c"]
// console.log(fn("a", "b")("c")) // ["a", "b", "c"]
// console.log(fn("a")("b")("c")) // ["a", "b", "c"]
// console.log(fn("a")("b", "c")) // ["a", "b", "c"]

function curry(fn, args, holes) {
  length = fn.length; // 5

  args = args || []; // []

  holes = holes || []; // []

  return function() {

      var _args = args.slice(0), // []
          _holes = holes.slice(0), // []
          argsLen = args.length, // 0
          holesLen = holes.length, // 0
          arg, i, index = 0;

      for (i = 0; i < arguments.length; i++) { // [_, _, 4, 5]
          arg = arguments[i];
          // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
          if (arg === _ && holesLen) {
              index++
              if (index > holesLen) {
                  // 定位最新的空参数索引
                  _args.push(arg);
                  _holes.push(argsLen - 1 + index - holesLen) // 传入的参数长度 + （索引-占位符长度 = 新增的占位符索引）
              }
          }
          // 处理类似 fn(1)(_) 这种情况
          else if (arg === _) {
              _args.push(arg); // 插入占位符
              _holes.push(argsLen + i); // 0
          }
          // 处理类似 fn(_, 2)(1) 这种情况
          else if (holesLen) {
              // fn(_, 2)(_, 3)
              if (index >= holesLen) {
                  _args.push(arg);
              }
              // fn(_, 2)(1) 用参数 1 替换占位符
              else {
                  _args.splice(_holes[index], 1, arg);
                  _holes.splice(index, 1)
              }
          }
          else {
              console.log('不是占位符直接插入')
              _args.push(arg); // 不是占位符直接插入
          }

      }
      if (_holes.length || _args.length < length) {
          console.log('_args', _args);
          console.log('_holes', _holes);
          return curry.call(this, fn, _args, _holes);
      }
      else {
          return fn.apply(this, _args);
      }
  }
}

var _ = {};

var fn = curry(function(a, b, c, d, e) {
  console.log([a, b, c, d, e]);
});

// 验证 输出全部都是 [1, 2, 3, 4, 5]
fn(1, 2, 3, 4, 5);
fn(_, 2, 3, 4, 5)(1);
fn(1, _, 3, 4, 5)(2);
fn(1, _, 3)(_, 4)(2)(5);
fn(1, _, _, 4)(_, 3)(2)(5);
fn(_, 2)(_, _, 4)(1)(3)(5)