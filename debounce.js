var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
  console.log(e);
  container.innerHTML = count++;
};

function debounce(func, wait, immediate) {
  var timeout, result;

  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

// 使用时间戳
function throttle1(func, wait) {
  var context, args;
  var previous = 0;

  return function() {
      var now = +new Date();
      context = this;
      args = arguments;
      if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
      }
  }
}

// 使用定时器
function throttle2(func, wait) {
  var timeout;
  var previous = 0;

  return function() {
      context = this;
      args = arguments;
      if (!timeout) {
          timeout = setTimeout(function(){
              timeout = null;
              func.apply(context, args)
          }, wait)
      }

  }
}

// 组合
function throttle3(func, wait) {
  var timeout, context, args, result;
  var previous = 0;

  var later = function() {
      previous = +new Date();
      timeout = null;
      func.apply(context, args)
  };

  var throttled = function() {
      var now = +new Date();
      //下次触发 func 剩余的时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
       // 如果没有剩余的时间了或者你改了系统时间
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
      } else if (!timeout) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}

// 第四版
function throttle4(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
  };

  var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}

var setUseAction = throttle3(getUserAction, 3000);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})