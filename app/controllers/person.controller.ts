/*
 * @Description: 基类
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-07 19:15:55
 * @LastEditors: Lanchao cui
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
const person = {
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
export default person;
