const fs = require('fs');
const axios = require('axios');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';

function checkForRSSFile() {
  fs.exists(configFilename, exists => {
    if (!exists) {
      return next(new Error(`Missing RSS file ${configFilename}`));
    }
    next(null, configFilename);
  });
}

function readRSSFile(configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) return next(err);
    feedList = feedList.toString()
      .replace(/^\s+|\s+$/g, '')
      .split('\n');
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFeed() {
  axios({ url: 'https://blog.nodejs.org/feed' }).then(res => {
    console.log(res);
  });
}

function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) {
    return next(new Error('No RSS items found'));
  }
  const item = handler.dom.items.shift();
  console.log(item.title);
}

const tasks = [
  checkForRSSFile,
  readRSSFile,
  downloadRSSFeed,
  parseRSSFeed
];

function next(error, result) {
  if (error) throw error;
  const currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

next();
