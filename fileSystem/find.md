# 查找文件里是否存在某些不合法的字符

以下是核心代码，`read.js`
```js
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const glob = require('glob');

// 假定【不合法的关键字符】是`//imgcdn.cn/`
const target = '//imgcdn.cn/';
// 查找的结果
const results = [];
// 缓存已经找到的内容，保证results数组元素的唯一性
const set = new Set();
const errors = require('./errors');

// 找到关键的不合法的数据
function hasTarget(source) {
  return source.includes(target);
}

// 在 【不合法的字符列表】 （即，error.js里的内容）里找到【不合法的关键字符】
function hasError(source) {
  for (let i = 0; i < errors.length; i++) {
    if (source.includes(errors[i])) return true;
  }
  return false;
}

function read(files) {
  // 读取文件
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // 排除node_modules目录
    if (file.includes('/node_modules/')) continue;
    const filename = path.resolve(__dirname, file);
    const data = fs.readFileSync(filename, 'utf8');
    // 如果文件里没有找到【不合法的关键字符】
    if (!hasTarget(data)) continue;
    // 逐行读取
    const reader = readline.createInterface({
      input: fs.createReadStream(filename),
    });
    reader.on('line', (source) => {
      if (hasTarget(source)) {
        if (hasError(source)) {
          // 如果已经存储过
          if (set.has(source)) return;
          // 存储唯一值
          set.add(source);
          results.push({
            file,
            source,
          });
        }
      }
    });
    reader.on('close', () => {
      // 打印非法字符
      console.table(results);
      // 退出
      process.exit(0);
    });
  }
}

function action(er, files) {
  if (er) throw er;
  read(files);
}

glob('src/**/*.js', action);
glob('src/**/*.jsx', action);
glob('src/**/*.css', action);
glob('src/**/*.scss', action);
glob('src/**/*.less', action);

```

假定`error.js`是不合法的字符列表，下面是`errors.js`内容
```js
module.exports = `
https://imgcdn.cn/4F7F6F6D-28DA-4F-120x72.gif
https://imgcdn.cn/90B97E11-8452-4E-16x16.svg
https://imgcdn.cn/EFC1261A-2BDF-4B-164x178.png
https://imgcdn.cn/F017099F-8515-4E-782x656.jpg
https://imgcdn.cn/6D30A73E-62C3-45-2156x1202.png
`
  .split('\n')
  .filter(Boolean)
  .map((value) => value.replace(/^https:/g, '').trim());
```

对`read.js`进行优化，下面是优化好的
```js
const fs = require('fs');
const path = require('path');
const { EOL } = require('os');
const glob = require('glob');

const target = '//imgcdn.sto.cn/';
const results = [];

const errors = require('./errors');

function hasTarget(source) {
  return source.includes(target);
}

function hasError(source) {
  for (let i = 0; i < errors.length; i++) {
    if (source.includes(errors[i])) return true;
  }
  return false;
}

function read(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.includes('/node_modules/')) continue;
    const filename = path.resolve(__dirname, file);
    const data = fs.readFileSync(filename, 'utf8');
    if (!hasTarget(data)) continue;
    // 获取所有的行【如果不需要行号，可以直接使用filter过滤】
    const list = data.split(new RegExp(EOL));
    for (let j = 0; j < list.length; j++) {
      const source = list[j];
      if (!hasError(source)) continue;
      results.push({
        file,
        lineno: j + 1,
        source,
      });
    }
  }
}

// 匹配路径模型
const patterns = [
  'src/**/*.js',
  'src/**/*.jsx',
  'src/**/*.css',
  'src/**/*.scss',
  'src/**/*.less',
  'public/**/*.html',
];

patterns.forEach((pattern) => {
  read(glob.sync(pattern));
});

console.table(results);

```

