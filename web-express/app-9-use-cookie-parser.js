const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// 1、设置中间件
app.use(cookieParser('sign is string'));

// 存储访问的城市名
let cities = [];

app.get('/', (req, res) => {
    res.send('浏览过的城市 ' + cities);
});

app.get('/ly', (req, res) => {
    let query = req.query, city = query.city;
    if (!city) {
        if (cities.length === 0) return res.send(`none`);
        // 设置加密cookie
        res.cookie('cities', cities, {maxAge: 60000, signed: true});
        return res.send(`the cities are: ${cities}`);
    }
    /**
     * 如果已经存在，则把城市名排到最前面；否则，添加到数组里
     */
    let index = cities.indexOf(city);
    if (index !== -1) {
        city = cities.splice(index, 1);
        cities.unshift(city);
    } else {
        cities.push(city);
    }
    res.cookie('cities', cities, {maxAge: 60000, signed: true});
    res.send(`the cities are: ${cities}`);
});

app.listen(3000, 'localhost', () => console.log(`server is running at 3000`));