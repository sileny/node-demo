const {URL} = require('url');

// 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash'
let myUrl = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(myUrl);

// 协议 主机 端口
console.log(myUrl.origin);