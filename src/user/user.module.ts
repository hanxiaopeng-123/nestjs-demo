import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import {ConfigModule } from '@nestjs/config'
// ConfigModule关闭isGlobal 需要在对应module模块注入才可使用对应service
@Module({
  // imports:[ConfigModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
