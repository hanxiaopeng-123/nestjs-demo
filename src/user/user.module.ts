import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';
import { Module ,CacheModule} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@/common/database/database.module';
import { UserProviders } from './user.providers';
import {ConfigModule } from '@nestjs/config'
// import { FeishuModule } from './feishu/feishu.module';
// ConfigModule关闭isGlobal 需要在对应module模块注入才可使用对应service
// imports:[ConfigModule],
@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [UserController,FeishuController],
  providers: [UserService,FeishuService,...UserProviders],
  exports: [UserService],
  // imports:[CacheModule.register()],
  // imports: [FeishuModule]
})
export class UserModule {}
