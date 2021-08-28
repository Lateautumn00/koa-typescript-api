<!--
 * @Description:
 * @Author: lanchao
 * @Date: 2021-07-15 16:40:49
 * @LastEditTime: 2021-08-23 15:35:44
 * @LastEditors: lanchao
 * @Reference:
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 -->

# koa-typescript-api

#### 介绍

koa 中引入 typescript
使用 koa-controllers 作为装饰器（注：也可用 koa-router 来书写接口）
实现 http 与 websocket

#### 软件架构

--app (代码)
----controllers（控制层,只负责接收参数和接收结果）
----service (逻辑层 负责处理具体逻辑)
----filters （过滤器）
----modules （模块、数据库连接、数据库操作、日志逻辑等）
----models （model 层 数据库 model）
----interface (数据接口)
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

#### 开发环境
node.js v12.16.1
mongodb v4+ 
#### 工具
chrome
postman
vscode

#### 使用说明

1. 本地测试启动
   1.1. yarn run watch (或者在 vscode 中 点击菜单 任务-运行任务 选择 tsc：监视-tsconfig.json 然后就可以自动生成代码)

   1.2. yarn run dev

2. 打包上线
   1.1. yarn run build

   1.2. 将 dist 目录压缩 上传服务器

   1.3. pm2 start dist/server.js --name koa-typescript-api

查看
打开 postman 或浏览器 输入 http://127.0.0.1:8888/api/v1/test

websocket 链接地址 ws://127.0.0.1:8888/socket/getName (例子见/test/websocket.html)

# koa-ts-controllers 解释

import {
Controller,
Ctx,
Req,
Body,
Get,
Post,
Delete,
Query,
Flow,
Params,
Version,
} from 'koa-ts-controllers';

Controller('/test')
Req
Body() 接收 post 参数
Flow() 中间件
Get() 定义 get 连接
Post() 定义 post 连接
Delete() 定义删除连接
Version() 版本
Query() 接收？参数
Params() 接收/:id/ids 类型参数
Ctx() 返回值 忽略

import { bootstrapControllers } from 'koa-ts-controllers';

bootstrapControllers(app, {
router, //路由
basePath: '/api',//接口路径
controllers: [
path.join(__dirname, '/app/controllers/*'),
],
versions: {
1: 'This version is deprecated and will soon be removed. Consider migrating to version 2 ASAP',
2: true,
dangote: true, // 非常适合定制的、特定于业务客户端的端点版本
},//版本 v1、v2、vdangote
});

# 命名规则

文件夹命名   小写 如：user

文件命名     小写.文件夹名称.ts  如：user.controller.ts

变量命名    小驼峰  如:userList

类命名      大驼峰  如：UserController

导入        import * as Dayjs from 'dayjs'

导出        export default  xxx;  export xxx;  export {xxx1,xxx2}