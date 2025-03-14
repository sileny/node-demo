const express = require('express');
const app = express();

// 使用中间件
app.use(function (req, res, next) {
  console.log('app.js');
  res.header('Access-Control-Allow-Origin', '*');
  // 允许进行跨域访问的方法，这里主要用到的是GET和POST两种方法。
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // 允许前端进行跨域访问的头部列表，程序需要进行用户名认证，所以这里设置为'Content-Type,Authorization'
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  // 发送Ajax时，Request header中便会带上 Cookie 信息。
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// 1、使用body-parser中间件处理post请求(parser x-www-form-urlencoded)
app.use(express.urlencoded({extended: false}));
// 2、使用body-parser中间件处理json请求
app.use(express.json());

app.get('/', (req, res, next) => res.send('index'));
// 当路由地址为`/`，则显示index页面
// 可以用独立模块替代，如下

// 当路由地址为`/admin`，显示`admin`模块页面
let admin = require('./admin/admin');
let product = require('./product/product');
app.use('/admin', admin);
app.use('/product', product);

// test for dataTable ajax
app.use('/test', (req, res, next) => {
  res.send(require('./mock/dataTable.json'));
});

app.use('/ip', (req, res, next) => {
  res.send(req.headers);
});

app.get('/treeData', (req, res, next) => {
  res.send(require('./mock/treeData.json'));
});

app.get('/iotlight/nb/select', (req, res, next) => {
  res.send(require('./mock/light.json'));
});

app.get('/abnomal/list', (req, res, next) => {
  res.send(require('./mock/alarm.json'));
});

app.get('/rbac/auth/menu/first', (req, res, next) => {
  res.send({ object: require('./mock/menu.json') });
});

const menus = [
  {
    "authid": "9e6e072cb12f4f4ca2615244e559db39",
    "name": "定时",
    "menuLevel": "2",
    "value": "/scene",
    "parentid": "71038ac9524e44699ba7027c4e73ae1b",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "01401506f63d43eda7c41f7e65d3dcd0",
    "name": "GIS地图管理",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 1,
    "icon": "fa-heart"
  },
  {
    "authid": "d7b7a5d7c0354a0689b1f06443dba312",
    "name": "平台设备状态",
    "menuLevel": "2",
    "value": "/device",
    "parentid": "25cabcd2f829427ebcd4745627d1f055",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "b17d9facd3984c08ace76246d2576469",
    "name": "路灯",
    "menuLevel": "2",
    "value": "/light",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 1,
    "icon": "fa-lightbulb-o"
  },
  {
    "authid": "70558945a2df4b7c952a75cda6840169",
    "name": "用户管理",
    "menuLevel": "2",
    "value": "/user",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 1,
    "icon": "fa-user"
  },
  {
    "authid": "ec0dfa4351634cc6b9db464fcbd4e1bc",
    "name": "报警列表",
    "menuLevel": "2",
    "value": "/alarmList",
    "parentid": "05a80aad9e0b4a80aaf21265efd35c16",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "161797d841c4466ab0e99d6570b12a46",
    "name": "比弦解决方案",
    "menuLevel": "2",
    "value": "/solution",
    "parentid": "9c608b33cc3b44b39b76ebfa84d575e9",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "99cc09a8988d4c1585b71f9e4e16ea8b",
    "name": "路灯图表",
    "menuLevel": "2",
    "value": "/lightshow",
    "parentid": "5e7efe49401b435fa2787038482d25e9",
    "sequence": 1,
    "icon": "fa-lightbulb-o"
  },
  {
    "authid": "e893dcf25d3749408b28f027903e24f2",
    "name": "操作日志",
    "menuLevel": "2",
    "value": "/operatorLog",
    "parentid": "b59d04e25fa74b0789be321d13ffd7c1",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "b9c0b9a49fd9476bbaecf7099d229eed",
    "name": "帮助文档",
    "menuLevel": "2",
    "value": "/help",
    "parentid": "72e983e599114d5c904fecc42e9a0db9",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "df42b4caa6504a629f02352a26b7fed4",
    "name": "5180×1280大屏",
    "menuLevel": "2",
    "value": "/bigscreen",
    "parentid": "06dfe8e6cbea49fdad42b64a14bb02aa",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "9ee0d837220f4eefa243e13ab034e576",
    "name": "设备状态推送",
    "menuLevel": "2",
    "value": "/api-device-status-stomp",
    "parentid": "7a32f41e2c0b4f0e864e1b669f0d4dcf",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "37e8ef0186124c5b92a1c4379e416d88",
    "name": "ace",
    "menuLevel": "2",
    "value": "/ace",
    "parentid": "5687abe5cdc14c47be9eb021e46bd704",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "3d3ae4eef9c54d8593e9887922e73d09",
    "name": "我的工单",
    "menuLevel": "2",
    "value": "/my-work-order",
    "parentid": "c25daa76627f484994a6ba26722048f5",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "728e0bed64dc4ce58639011b5cba7bc4",
    "name": "巡检",
    "menuLevel": "2",
    "value": "/check",
    "parentid": "71038ac9524e44699ba7027c4e73ae1b",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "b89d5e170c6e45fda3408a783e0ee7f4",
    "name": "路灯报表",
    "menuLevel": "2",
    "value": "/lightReport",
    "parentid": "d9cf5d2c360547108feb3cb69e7c9750",
    "sequence": 1,
    "icon": "fa-bars"
  },
  {
    "authid": "7c748275f83e4ad08cad67666df04554",
    "name": "井盖",
    "menuLevel": "2",
    "value": "/hole",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 2,
    "icon": "fa-bullseye"
  },
  {
    "authid": "b600a7b8d0de4989afee0c39ff9e26b8",
    "name": "处理记录",
    "menuLevel": "2",
    "value": "/alarmDeal",
    "parentid": "05a80aad9e0b4a80aaf21265efd35c16",
    "sequence": 2,
    "icon": "fa-bars"
  },
  {
    "authid": "25cabcd2f829427ebcd4745627d1f055",
    "name": "设备管理",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 2,
    "icon": "fa-cog"
  },
  {
    "authid": "f5e7ad39a96d487ab97940ba50a5b954",
    "name": "接收日志",
    "menuLevel": "2",
    "value": "/receiveLog",
    "parentid": "b59d04e25fa74b0789be321d13ffd7c1",
    "sequence": 2,
    "icon": "fa-bars"
  },
  {
    "authid": "223fb5b96e2f4de89611736372ede55f",
    "name": "角色管理",
    "menuLevel": "2",
    "value": "/role",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 2,
    "icon": "fa-rocket"
  },
  {
    "authid": "34607d8b6680462c8700898da1df6408",
    "name": "UDP设备状态",
    "menuLevel": "2",
    "value": "/udpDevice",
    "parentid": "25cabcd2f829427ebcd4745627d1f055",
    "sequence": 2,
    "icon": "fa-bars"
  },
  {
    "authid": "baf6efad4d12423ca92c0f0fa3515301",
    "name": "井盖图表",
    "menuLevel": "2",
    "value": "/holeshow",
    "parentid": "5e7efe49401b435fa2787038482d25e9",
    "sequence": 2,
    "icon": "fa-bullseye"
  },
  {
    "authid": "08963bd1780f47b3b5dd376d49fb975c",
    "name": "烟感图表",
    "menuLevel": "2",
    "value": "/smokeshow",
    "parentid": "5e7efe49401b435fa2787038482d25e9",
    "sequence": 2,
    "icon": "fa-fire"
  },
  {
    "authid": "2c9e8760afdf414c8769b932634ae28f",
    "name": "sb2",
    "menuLevel": "2",
    "value": "/sb2",
    "parentid": "5687abe5cdc14c47be9eb021e46bd704",
    "sequence": 2,
    "icon": "fa-bars"
  },
  {
    "authid": "bed5210385d741f6a09b3bc674e404fe",
    "name": "工单处理",
    "menuLevel": "2",
    "value": "/work-order-handle",
    "parentid": "c25daa76627f484994a6ba26722048f5",
    "sequence": 2,
    "icon": "fa-bars"
  },
  {
    "authid": "94020028c2f64020868cb71b70afccfe",
    "name": "停车图表",
    "menuLevel": "2",
    "value": "/carshow",
    "parentid": "5e7efe49401b435fa2787038482d25e9",
    "sequence": 2,
    "icon": "fa-bullseye"
  },
  {
    "authid": "71038ac9524e44699ba7027c4e73ae1b",
    "name": "情景定时",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 3,
    "icon": "fa-hand-o-right"
  },
  {
    "authid": "5e7d5bd6522442a1b08d320751ebf26c",
    "name": "烟感",
    "menuLevel": "2",
    "value": "/smoke",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 3,
    "icon": "fa-fire"
  },
  {
    "authid": "4e100edf8dc74d10b880bfa34ceed80d",
    "name": "登录日志",
    "menuLevel": "2",
    "value": "/loginLog",
    "parentid": "b59d04e25fa74b0789be321d13ffd7c1",
    "sequence": 3,
    "icon": "fa-bars"
  },
  {
    "authid": "da6789db1dcd44469ce325f9420c4123",
    "name": "报表日志",
    "menuLevel": "2",
    "value": "/reportLog",
    "parentid": "b59d04e25fa74b0789be321d13ffd7c1",
    "sequence": 3,
    "icon": "fa-bars"
  },
  {
    "authid": "b5b8078978b84b31a33199570642f987",
    "name": "权限管理",
    "menuLevel": "2",
    "value": "/auth",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 3,
    "icon": "fa-bars"
  },
  {
    "authid": "9adc2a1e04c94a15919da47aea49b2f6",
    "name": "ace2",
    "menuLevel": "2",
    "value": "/ace2",
    "parentid": "5687abe5cdc14c47be9eb021e46bd704",
    "sequence": 3,
    "icon": "fa-leaf"
  },
  {
    "authid": "c25daa76627f484994a6ba26722048f5",
    "name": "工单管理",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 3,
    "icon": "fa-bars"
  },
  {
    "authid": "a8fbd5fd83824dd797a12d5f5e6156e9",
    "name": "空气",
    "menuLevel": "2",
    "value": "/air",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 4,
    "icon": "fa-cloud"
  },
  {
    "authid": "0d28773f7a9244138b8d161fc3f502df",
    "name": "平台设备分组",
    "menuLevel": "2",
    "value": "/device-group-page",
    "parentid": "25cabcd2f829427ebcd4745627d1f055",
    "sequence": 4,
    "icon": "fa-bars"
  },
  {
    "authid": "05a80aad9e0b4a80aaf21265efd35c16",
    "name": "报警管理",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 4,
    "icon": "fa-bell-o"
  },
  {
    "authid": "526f2cb7192a40c1beade858dad5f25c",
    "name": "水质图表",
    "menuLevel": "2",
    "value": "/watershow",
    "parentid": "5e7efe49401b435fa2787038482d25e9",
    "sequence": 4,
    "icon": "fa-tint"
  },
  {
    "authid": "2a0172de039e4a3e99d484dcee4405f7",
    "name": "组织管理",
    "menuLevel": "2",
    "value": "/org",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 4,
    "icon": "fa-bookmark-o"
  },
  {
    "authid": "5e7efe49401b435fa2787038482d25e9",
    "name": "图表展示",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 5,
    "icon": "fa-bar-chart-o"
  },
  {
    "authid": "d8435cd23daa4b83b657e46065a26c6b",
    "name": "水质",
    "menuLevel": "2",
    "value": "/water",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 5,
    "icon": "fa-tint"
  },
  {
    "authid": "5c2757725c1b4b3d856054c1e32d4b66",
    "name": "空气图表",
    "menuLevel": "2",
    "value": "/airshow",
    "parentid": "5e7efe49401b435fa2787038482d25e9",
    "sequence": 5,
    "icon": "fa-cloud"
  },
  {
    "authid": "eb6533048aa3405aadc948442020e509",
    "name": "平台管理",
    "menuLevel": "2",
    "value": "/platform",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 5,
    "icon": "fa-bars"
  },
  {
    "authid": "e08e75f95bf549a4a176c0d081117443",
    "name": "平台设备激活",
    "menuLevel": "2",
    "value": "/device-active",
    "parentid": "25cabcd2f829427ebcd4745627d1f055",
    "sequence": 5,
    "icon": "fa-bars"
  },
  {
    "authid": "915caaa8b72d40e09b451541a3dc4760",
    "name": "离线日志",
    "menuLevel": "2",
    "value": "/offlineLog",
    "parentid": "b59d04e25fa74b0789be321d13ffd7c1",
    "sequence": 5,
    "icon": "fa-bars"
  },
  {
    "authid": "d9cf5d2c360547108feb3cb69e7c9750",
    "name": "报表展示",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 5,
    "icon": "fa-bars"
  },
  {
    "authid": "c3466009766a455a97f794c7c16acaa2",
    "name": "垃圾桶",
    "menuLevel": "2",
    "value": "/garbage",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 6,
    "icon": "fa-trash-o"
  },
  {
    "authid": "86644a16c28f46a1aab48b7223ff5ee2",
    "name": "垃圾桶图表",
    "menuLevel": "2",
    "value": "/garbageshow",
    "parentid": "5e7efe49401b435fa2787038482d25e9",
    "sequence": 6,
    "icon": "fa-trash-o"
  },
  {
    "authid": "beafbab38da34f739b50afc552a6455f",
    "name": "系统管理",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 6,
    "icon": "fa-wrench"
  },
  {
    "authid": "57f8ecc1bb0d48698f14738ad0943f9e",
    "name": "开关管理",
    "menuLevel": "2",
    "value": "/switch",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 6,
    "icon": "fa-bars"
  },
  {
    "authid": "b59d04e25fa74b0789be321d13ffd7c1",
    "name": "日志管理",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 7,
    "icon": "fa-bars"
  },
  {
    "authid": "a5e1a10e8c2543dbacabe91a5ad24a39",
    "name": "数据字典",
    "menuLevel": "2",
    "value": "/dd",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 7,
    "icon": "fa-bars"
  },
  {
    "authid": "ec50169888fe4a088eb7e0e1c88054d3",
    "name": "停车",
    "menuLevel": "2",
    "value": "/car",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 7,
    "icon": "fa-car"
  },
  {
    "authid": "5687abe5cdc14c47be9eb021e46bd704",
    "name": "模板管理",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 8,
    "icon": "fa-bars"
  },
  {
    "authid": "cc04223fdfaa421295d298a1492ec4fd",
    "name": "智能锁",
    "menuLevel": "2",
    "value": "/lock",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 8,
    "icon": "fa-lock"
  },
  {
    "authid": "3af0ce448d884717a200412766d97738",
    "name": "日志导出",
    "menuLevel": "2",
    "value": "/logload",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 9,
    "icon": "fa-list"
  },
  {
    "authid": "72e983e599114d5c904fecc42e9a0db9",
    "name": "使用帮助",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 9,
    "icon": "fa-bars"
  },
  {
    "authid": "9b8f7df3a9d74ea98c873647b009dd64",
    "name": "所有设备",
    "menuLevel": "2",
    "value": "/showAll",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 10,
    "icon": "fa-bars"
  },
  {
    "authid": "e5bf836af9ae4c8f881c47cbe89ae793",
    "name": "参数管理",
    "menuLevel": "2",
    "value": "/write",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 10,
    "icon": "fa-bars"
  },
  {
    "authid": "9c608b33cc3b44b39b76ebfa84d575e9",
    "name": "产品方案",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 10,
    "icon": "fa-bars"
  },
  {
    "authid": "458e8a6840c04bf884045105226d5bbe",
    "name": "演示大类别",
    "menuLevel": "2",
    "value": "/demoBig",
    "parentid": "01401506f63d43eda7c41f7e65d3dcd0",
    "sequence": 10,
    "icon": "fa-bars"
  },
  {
    "authid": "106259b3c9ca47b297d8b314fc962338",
    "name": "商务合作",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 11,
    "icon": "fa-bars"
  },
  {
    "authid": "7a32f41e2c0b4f0e864e1b669f0d4dcf",
    "name": "开放接口",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 11,
    "icon": "fa-bars"
  },
  {
    "authid": "1dca3816dfd841ad9dc946c84a63f127",
    "name": "合作流程",
    "menuLevel": "2",
    "value": "/cooperation",
    "parentid": "106259b3c9ca47b297d8b314fc962338",
    "sequence": 11,
    "icon": "fa-bars"
  },
  {
    "authid": "686217ac6d604b0fae11eabd85eb9f4b",
    "name": "性能监控",
    "menuLevel": "2",
    "value": "/druid",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 11,
    "icon": "fa-bars"
  },
  {
    "authid": "06dfe8e6cbea49fdad42b64a14bb02aa",
    "name": "大屏管理",
    "menuLevel": "1",
    "value": null,
    "parentid": null,
    "sequence": 12,
    "icon": "fa-bars"
  },
  {
    "authid": "541840f11e054d8ebc00e3e2e3f2432b",
    "name": "登录用户",
    "menuLevel": "2",
    "value": "/loadusers",
    "parentid": "beafbab38da34f739b50afc552a6455f",
    "sequence": 12,
    "icon": "fa-bars"
  }
];

app.get('/rbac/auth/menu/second', (req, res, next) => {
  console.log('------------- /rbac/auth/menu/second ----------', req.query['parentId']);
  const param = req.query['parentId'];
  res.send({ object: menus.filter(value => value.parentid === param) });
});

app.post('/login', (req, res, next) => {
  console.log('--login--');
  res.json({ "user-holder": { "id": "test", "name": "test" } });
});

app.post('/login-nd', (req, res, next) => {
  console.log('---------- login-nd ----------', req.body);
  res.json({ object: { "user-holder": { "id": "test", "name": "test" } } });
});

app.get('/system/getUserAuth', (req, res, next) => {
  res.send(require('./mock/menuList.json'));
});

app.get('/system/current-user/org-tree', (req, res, next) => {
  res.send(require('./mock/orgTree.json'));
});

// 重定向
app.get('/**', (req, res, next) => {
  console.log('----------redirect--------', req.url);
  res.redirect('/');
});

app.listen(3000, () => console.log('server is running at 3000 port'));
