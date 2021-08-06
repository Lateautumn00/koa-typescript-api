/*
 * @Description:
 * @Author: Lanchao cui
 * @Date: 2021-08-06 19:53:36
 * @LastEditTime: 2021-08-06 20:00:27
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import * as ws from 'ws';
const ws1: any = new ws.Server({ noServer: true });
ws1.on('connection', function (conn: any, request: any) {
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
export default ws1;
