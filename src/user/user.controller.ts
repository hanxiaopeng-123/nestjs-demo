import { Controller, Get, Post, Body, Patch, Param, Delete, Version,VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {BusinessException} from '../common/exceptions/business.exception'
import { ConfigService } from '@nestjs/config';
import {ApiTags,ApiOperation} from '@nestjs/swagger'
import {AddUserDto} from './user.dto'
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly configService:ConfigService) {}

  @ApiOperation({
    summary: '新增用户',
  })
  @Post('/add')
  createUser(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }

  @Get('getTestName')
  getTestName(){
    return this.configService.get('TEST_VALUE').name
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @Version('2')
  findAll2() {
    return '222';
  }
  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {}
    console.log(a.b.c)
    return this.userService.findAll();
  }

  @Get('findBussinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBussinessError() {
    try {
      const a: any = {}
      console.log(a.b.c)
    } catch (error) {
      throw new BusinessException('你的参数错了')
    }

    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
