/*
 * @Description: 处理websocket逻辑
 * @Author: lanchao
 * @Date: 2021-08-06 20:09:24
 * @LastEditTime: 2021-08-23 15:38:53
 * @LastEditors: lanchao
 * @Reference:
 */
import * as Ws from 'ws';
const demoWs: any = new Ws.Server({ noServer: true });
demoWs.on('connection', function (conn: any, request: any) {
  console.log('ws connect');
  conn.on('message', (message: any) => {
    console.log('received: %s', message);
    message = JSON.parse(message);
    switch (message.type) {
      case 'PING':
        conn.send(
          JSON.stringify({
            code: 1000,
            type: 'PONG',
            data: {},
            message: '成功',
          })
        );
        break;
      default:
        console.error('类型错误！');
        break;
    }
  });
});
export default demoWs;
