// 解析url地址
const url = require('url');

// url.parse
console.log(url.parse('http://www.baidu.com'));

// 不带第二参数，则获取get传值
console.log(url.parse('http://www.baidu.com/?name=hx'));
// 第二参数为true，则把query解析成一个对象
console.log(url.parse('http://www.baidu.com/?name=hx', true));

// 完整的url
// 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'