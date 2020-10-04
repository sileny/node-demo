const {URLSearchParams} = require('url');
let params;

params = new URLSearchParams('user=abc&query=xyz');
console.log(params.get('user'));
// 输出 'abc'
console.log(params.toString());
// 输出 'user=abc&query=xyz'

params = new URLSearchParams('?user=abc&query=xyz');
console.log(params.toString());
// 输出 'user=abc&query=xyz'

// 添加查询参数
params.append('key', 'value');
console.log(params);

// 删除查询参数
params.delete('key');
console.log(params);

// 是否有某个查询参数
console.log(params.has('key'));

// 获取所有查询参数
console.log(params.getAll('key'));
console.log(params.getAll('user'));

console.log(params.entries());

console.log(params.keys());

console.log(params.values());

params.set('key', 'new value');
console.log(params);