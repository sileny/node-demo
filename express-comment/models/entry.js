const redis = require('redis');
const db = redis.createClient();

class Entry {
  constructor(props) {
    for (const prop of props) {
      this[prop] = props[prop];
    }
  }

  save(cb) {
    const json = JSON.stringify(this);
    db.lpush('entries', json, err => {
      if (err) return cb(err);
      cb();
    });
  }

  static getRange(from, to, cb) {
    db.lrange('entries', from, to, (err, items) => {
      if (err) return cb(err);
      cb(null, items.map(val => JSON.parse(val)))
    });
  }
}

module.exports = Entry;
