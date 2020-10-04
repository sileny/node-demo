// Buffer.alloc([size[, fill [, encoding]]);
// size {integer} 填充的长度
// fill {string | Buffer | integer} 填充的内容。默认值为0
// encoding {string} 默认是`utf8`

// 分片一个大小为size字节的Buffer。(没有指定fill,则默认以0来填充Buffer；没有指定encoding,则默认以`utf8`作为默认编码字符)
const buf = Buffer.alloc(5);

// <Buffer 00 00 00 00 00>
console.log(buf);
