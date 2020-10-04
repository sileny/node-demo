// 解析url地址
const url = require('url');

console.log(url.resolve('http://abc.com', 'directory'));

console.log(url.resolve('http://abc.com/replace', 'directory'));