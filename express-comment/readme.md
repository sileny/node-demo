# express-comment

- [程序规划](#target)


### target

- 可以注册、登录、登出
- 发用消息
- 分页浏览
- 支持认证

针对上述需求，设计以下路由

- `GET /api/entries` 获取条目列表
- `GET /api/entries/page` 分页获取条目列表
- `POST /api/entry` 创建留言条目
- `GET /post` 显示新创建留言的表单
- `POST /post` 提交留言表单
- `GET /register` 获取注册界面
- `POST /register` 提交注册表单
- `GET /login` 获取登录界面
- `POST /login` 提交登录接口
- `GET /logout` 退出

