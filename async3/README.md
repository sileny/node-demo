# async

### why-how

为什么要使用串行流程控制业务

可能会遇到类似的业务实现

```js
setTimeout(() => {
  console.log(1);
  setTimeout(() => {
    console.log(22);
    setTimeout(() => {
      console.log(33);
    }, 1000);
  }, 500);
}, 100);
```

存在的问题，代码会嵌套的很深，缺少组织性

### 如何优雅地使用串行控制流程

串行代码，可以通过 `async` 第三方库进行改造，该包在内部做了很多兼容性处理

`npm install async`

改造很简单

```js
const async = require('async');

const res = async.series([
  callback => {
    setTimeout(() => {
      console.log(1);
      callback(); // 作用：告诉async已经正常执行完了，可以返回值
    }, 100);
  },
  callback => {
    setTimeout(() => {
      console.log(2);
      callback();
    }, 500);
  },
  callback => {
    setTimeout(() => {
      console.log(3);
      callback();
    }, 1000);
  }
]);

console.log(res); // 返回的是Promise类型的对象

```

`.series` 方法接收一个 `function` 类型的数组，每一个方法会在前一个方法执行完毕后被执行一次。
如果，任意一个方法抛出错误到回调里，剩余的 `function` 不会执行，而且会立即抛出错误值。
如果没有错误，执行完毕后，则会得到一个一系列回调函数执行的结果。


还可以利用可选参数，该参数为 `function` 类型，接收错误或者返回值

```js
const async = require('async');

const res = async.series([
  callback => {
    setTimeout(() => {
      console.log(1);
      callback(null, 111111);
    }, 100);
  },
  callback => {
    setTimeout(() => {
      console.log(2);
      callback();
    }, 500);
  },
  callback => {
    setTimeout(() => {
      console.log(3);
      callback();
    }, 1000);
  }
], (error, results) => { // 返回值丢给了回调的第二参数，以数组的形式返回
  console.log('results', results);
});

console.log('res', res); // 返回值给了回调的第二参数，所以返回undefined
```


当然，也可以使用对象替代数组的写法，那么，每个属性对应的值会被当做 `function` 执行一次，结果，会以 **键值对** 的形式返回

```js
async.series({
  one: function(callback) { // 键值对的写法
    setTimeout(function() {
      callback(null, 1);
    }, 200);
  },
  method(callback) {
    setTimeout(() => {
      callback(null, 2);
    }, 100);
  }
}, function(err, results) {
  console.log(err, results); // null { one: 1, method: 2 }
});
```

# 源码说明

```js
function series(tasks, callback) {
    return _parallel(eachOfSeries$1, tasks, callback);
}
```

`series` 第二参数 `callback` 为可选参数，可以用来接收错误和回调函数返回的结果

`series` 内部调用了私有方法 `_parallel`，该方法以 `eachOfSeries$1` 为第一参数，将需要执行的任务丢入第二参数，在 `parallel` 内部进行业务处理。

从上面的案例来不难看出，`series` 第二参数可以是数组，也可以是对象。
- 数组类型：数组的每一个元素当作 `function` 在运行时执行
- 对象类型：对象的每个属性对应的值当作 `function` 在运行时执行

`awaitify` 内部源码是将异步的函数转换成 `Promise` 调用的形式。
```js
// conditionally promisify a function.
// only return a promise if a callback is omitted
function awaitify (asyncFn, arity = asyncFn.length) {
    if (!arity) throw new Error('arity is undefined')
    function awaitable (...args) {
        if (typeof args[arity - 1] === 'function') {
            return asyncFn.apply(this, args)
        }

        return new Promise((resolve, reject) => {
            args[arity - 1] = (err, ...cbArgs) => {
                if (err) return reject(err)
                resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
            };
            asyncFn.apply(this, args);
        })
    }

    return awaitable
}
```

`eachOfSeries$1` 是 `awaitify(eachOfSeries, 3);` 执行的结果，`3` 表示一次最多操作的异步次数

`eachOfSeries` 三个参数 `coll`, `iteratee`, `callback`，分别是 `要迭代的集合`、`一个将要在第一参数里遍历执行的function`、可选的用来接收错误或返回值的回调。

`eachOfSeries` 内部会调用 `eachOfLimit$2`，其是 `awaitify(eachOfLimit$1, 4);` 执行的结果，`4` 表示一次最多操作的异步次数

`eachOfLimit$2` 在内部会调用 `eachOfLimit(limit)(coll, wrapAsync(iteratee), callback)`，并将执行的结果返回

`eachOfLimit` 内部源码如下，
```js
function once(fn) {
  function wrapper (...args) {
    // 如果callback没有指定，返回undefined
    if (fn === null) return;
    var callFn = fn;
    fn = null;
    // 否则执行callback
    callFn.apply(this, args);
  }
  Object.assign(wrapper, fn);
  return wrapper
}

function isAsyncGenerator(fn) {
  // 等价于`Object.prototype.toString.call(a)` === "[object AsyncFunction]";
  return fn[Symbol.toStringTag] === 'AsyncGenerator';
}

function isAsyncIterable(obj) {
  return typeof obj[Symbol.asyncIterator] === 'function';
}

var eachOfLimit = (limit) => {
  // 返回一个高阶函数
  return (obj, iteratee, callback) => {
    // 执行一次callback（即，可选的用来接收错误或回调值的回调）
    callback = once(callback);
    if (limit <= 0) {
      throw new RangeError('concurrency limit cannot be less than 1')
    }
    // 如果第一参数不存在，则报错
    if (!obj) {
      return callback(null);
    }
    // 异步的迭代器
    if (isAsyncGenerator(obj)) {
      return asyncEachOfLimit(obj, limit, iteratee, callback)
    }
    if (isAsyncIterable(obj)) {
      return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback)
    }
    var nextElem = createIterator(obj);
    var done = false;
    var canceled = false;
    var running = 0;
    var looping = false;

    function iterateeCallback(err, value) {
      if (canceled) return
      running -= 1;
      if (err) {
        done = true; // 标记执行完成
        callback(err); // 执行回调
      }
      else if (err === false) {
        done = true;
        canceled = true;
      }
      else if (value === breakLoop || (done && running <= 0)) {
        done = true;
        return callback(null);
      }
      else if (!looping) {
        replenish();
      }
    }

    function replenish () {
      looping = true;
      while (running < limit && !done) { // 并行迭代任务
        var elem = nextElem();
        if (elem === null) {
          done = true;
          if (running <= 0) {
            callback(null);
          }
          return;
        }
        running += 1;
        iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
      }
      looping = false;
    }

    replenish();
  };
};
```
