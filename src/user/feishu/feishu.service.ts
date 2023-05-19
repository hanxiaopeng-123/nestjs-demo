import { parse } from 'yaml';
import { Inject, Injectable } from '@nestjs/common';
import { CreateFeishuDto } from './dto/create-feishu.dto';
import { UpdateFeishuDto } from './dto/update-feishu.dto';
import {CACHE_MANAGER} from '@nestjs/cache-manager'
import {Cache} from 'cache-manager'
import { ConfigService } from '@nestjs/config';
import { BusinessException } from '@/common/exceptions/business.exception';
import {getAppToken} from 'src/helper/feishu/auth'
import {messages} from 'src/helper/feishu/message'
import client from 'src/utils/redis'
@Injectable()
export class FeishuService {
  private APP_TOKEN_CACHE_KEY
  constructor( 
     @Inject(CACHE_MANAGER) private cacheManager:Cache,
    private configService:ConfigService
  ){
    this.APP_TOKEN_CACHE_KEY=this.configService.get('FEISHU_CONFIG')['APP_TOKEN_CACHE_KEY']
  }

  async getAppToken() {
    let appToken: string;
    appToken=await client.get(this.APP_TOKEN_CACHE_KEY)
    // appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
    if (!appToken) {
      const response = await getAppToken();
      if (response.code === 0) {
        // token 有效期为 2 小时，在此期间调用该接口 token 不会改变。当 token 有效期小于 30 分的时候,再次请求获取 token 的时候，会生成一个新的 token，与此同时老的 token 依然有效。
        appToken = response.app_access_token;
        await client.set(this.APP_TOKEN_CACHE_KEY,appToken)
        await client.expire(this.APP_TOKEN_CACHE_KEY,response.expire - 60)
        // await  this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, appToken, (response.expire - 60)*1000);
        // await this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, appToken, {
        //   ttl: response.expire - 60,
        // })
      } else {
        throw new BusinessException('飞书调用异常')
      }
    }
    return appToken;
  }
 
 
  async sendMessage(receive_id_type, params) {
    const app_token = await this.getAppToken()
    return messages(receive_id_type, params, app_token as string)
  }

  create(createFeishuDto: CreateFeishuDto) {
    return 'This action adds a new feishu';
  }

  findAll() {
    return `This action returns all feishu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feishu`;
  }

  update(id: number, updateFeishuDto: UpdateFeishuDto) {
    return `This action updates a #${id} feishu`;
  }

  remove(id: number) {
    return `This action removes a #${id} feishu`;
  }
}
