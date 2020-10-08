const env = process.env.NODE_ENV || 'development';

function errorHandler(err, req, res, next) {
  res.statusCode = 500;
  switch (env) {
    case 'development':
      console.log('error', err);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(err)); // 将错误信息输出，并没有将敏感信息暴露出来
      break;
    default:
      res.end('Server error');
  }
}

module.exports = errorHandler;
