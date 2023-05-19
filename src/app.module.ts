import { Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {ConfigModule } from '@nestjs/config'
import {getConfig} from './utils'
import { CacheModule} from '@nestjs/cache-manager'
import  redisStore from 'cache-manager-redis-store';
// import { from  } from 'rxjs';
import {RedisClientOptions} from 'redis';
const redisConfig= getConfig('REDIS_CONFIG')
@Module({
  imports: [
    CacheModule.register(   
      {
      isGlobal: true,
      store:redisStore as any,
      host:getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db
  }),
  ConfigModule.forRoot({ 
    ignoreEnvFile: true, 
    isGlobal:true,//开启 Config 全局注册，如果 isGlobal 没有添加的话，则需要先在对应的 module 文件中注册后才能正常使用 ConfigService
    load:[getConfig]
  }),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
