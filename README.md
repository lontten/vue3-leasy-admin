# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## todo
- [ ] 整体布局
- [ ] request封装
- [ ] 登陆页
- [ ] 我的
- [ ] 我的详情
- [ ] ProTable
- [ ] ProForm
- [ ] 根据json，生成页面


## 部署
```
# nginx 部署配置，不然会404

location / {
  try_files $uri $uri/ /index.html;
}

# 非根目录 例如放在 html下面的 p099-admin 目录下面
location /p099-admin {
  try_files $uri $uri/ /p099-admin/index.html;
}

```
