import { Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {ConfigModule } from '@nestjs/config'
import {getConfig} from './utils'
import { CacheModule} from '@nestjs/cache-manager'

@Module({
  imports: [CacheModule.register(   {isGlobal: true},),ConfigModule.forRoot({ 
    ignoreEnvFile: true, 
    isGlobal:true,//开启 Config 全局注册，如果 isGlobal 没有添加的话，则需要先在对应的 module 文件中注册后才能正常使用 ConfigService
    load:[getConfig]
  }),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
