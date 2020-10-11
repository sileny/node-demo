const connect = require('connect');
const compression = require('compression');

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

connect()
  .use(compression({ threshold: 0, filter: shouldCompress }))
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('This response is compressed');
  })
  .listen(3000);
