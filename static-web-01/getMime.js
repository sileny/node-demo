// 根据后缀名返回mime类型
module.exports.getMime = function (name) {
    switch (name) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        default:
            return 'text/html';
    }
};