# koa-typescript-api

#### 介绍

koa 中引入 typescript ，借鉴 mvc 模式
使用 koa-controllers 作为装饰器（注：也可用 koa-router 来书写接口）

#### 软件架构

--app (代码)
--controllers（控制层）
--filters  （过滤器）
--modules （模块）
--models （model 层）
  --schemaModel （数据表规范）
--interface (数据接口)
--config （配置）
==dist （打包生成）
--node_modules
--package.json
--server.ts （入口）
--tsconfig.json
--tslint.json

#### 安装教程

1. git clone https://gitee.com/cuilanchao/koa-typescript-api.git

2. cd koa-typescript-api

3. yarn

#### 使用说明

1. 本地测试启动
   1.1. yarn run watch

   1.2. yarn run dev

2. 打包上线
   1.1. yarn run build

   1.2. 将 dist 目录压缩 上传服务器

   1.3. pm2 start dist/server.js --name koa-typescript-api

查看
打开 postman 或浏览器 输入 http://127.0.0.1:8888/test/index
