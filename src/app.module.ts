import { Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {ConfigModule } from '@nestjs/config'
import {getConfig} from './utils'
import { CacheModule} from '@nestjs/cache-manager'
import  redisStore from 'cache-manager-redis-store';
import {RedisClientOptions} from 'redis';
import {AuthModule} from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard'
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
  }),UserModule,AuthModule],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {}
