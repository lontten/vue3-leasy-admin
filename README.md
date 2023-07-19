# leasy-admin

经过过度封装的后台模版，适合那些前端技术不好的后端开发人员，
可以让他们快速开发出一个完整的后台管理系统，同时页面也不太难看。

## todo
- [ ] 整体布局
- [x] request封装
- [ ] 登陆页
- [ ] 我的
- [ ] 我的详情
- [x] ProTable
- [x] ProForm
- [ ] 根据json，生成页面
- [x] 腾讯地图
- [ ] 高德地图
- [ ] 百度地图


## 部署
```
# nginx 部署配置，不然会404

location / {
  try_files $uri $uri/ /index.html;
}

# 非根目录 例如放在 html下面的 leasy-admin 目录下面
location /leasy-admin {
  try_files $uri $uri/ /leasy-admin/index.html;
}

```
