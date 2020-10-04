const dns = require('dns');

// 会受到本地host影响(跟ping命令一样)
// 线程池中同步调用getaddrinfo
dns.lookup('nodejs.org', (err, address, family) => {
    if (err) throw err;
    console.log(address, family);
});
dns.lookup('nodejs.org', {
    all: true
}, (err, address, family) => {
    if (err) throw err;
    console.log(address, family);
});

// 不会受到本地host影响
// 不受到/etc/hosts的影响
// 没有使用getaddrinfo方法且使用网络执行dns查询
// 不使用线程池
dns.resolve4('nodejs.org', (err, address) => {
    if (err) throw err;
    console.log(address);
});

// 通过ip反查域名
// 将参数address和port传入操作系统底层getnameinfo服务来解析处理并返回主机名
// host是有效的ip地址，无效会报错为TypeError
// port是有效的端口，无效报错为TypeError
dns.lookupService('52.74.223.119', 80, (err, host, service) => {
    if (err) throw err;
    console.log(host, service);
});
