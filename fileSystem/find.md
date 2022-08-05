# 查找文件里是否存在某些不合法的字符

```js
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const glob = require('glob');

// 假定不合法的字符是`//imgcdn.cn/`
const target = '//imgcdn.cn/';
const results = [];
const set = new Set();
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
    const reader = readline.createInterface({
      input: fs.createReadStream(filename),
    });
    reader.on('line', (source) => {
      if (hasTarget(source)) {
        if (hasError(source)) {
          if (set.has(source)) return;
          set.add(source);
          results.push({
            file,
            source,
          });
        }
      }
    });
    reader.on('close', () => {
      console.table(results);
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

下面是`errors.js`内容
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

