/*
 * @Description:websocket入口
 * @Author: lanchao
 * @Date: 2021-08-06 20:01:25
 * @LastEditTime: 2021-08-07 19:40:41
 * @LastEditors: lanchao
 * @Reference:
 */
import demo1Ws from './ws/demo1.ws';
import demo2Ws from './ws/demo2.ws';
/**
 * @description: 处理socket链接分发数据操作
 * @param  {*}
 * @return {*}
 * @param {any} server
 */
function wsServer(server: any) {
  server.on('upgrade', function upgrade(request: any, socket: any, head: any) {
    const pathname: string = request.url.split('?')[0];
    switch (pathname) {
      case '/socket/getName':
        demo1Ws.handleUpgrade(request, socket, head, function done(ws) {
          demo1Ws.emit('connection', ws, request);
        });
        break;
      case '/socket/getName1':
        demo2Ws.handleUpgrade(request, socket, head, function done(ws) {
          demo2Ws.emit('connection', ws, request);
        });
        break;
      default:
        console.error('不存在的websocket连接地址');
        socket.destroy();
        break;
    }
  });
}

export default wsServer;
