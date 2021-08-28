/*
 * @Description: 基类
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-23 15:27:12
 * @LastEditors: lanchao
 * @Reference:
 */
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
import { FromDataInterface } from '../interface/person.interface';

class PersonController {
  protected fromData(code: number, data: object, message?: string): object {
    if (!message) message = code === 1000 ? '成功' : '失败';
    const jsonData: FromDataInterface = {
      code,
      data,
      message,
    };
    return jsonData;
  }
}
export default {
  PersonController,
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
};
