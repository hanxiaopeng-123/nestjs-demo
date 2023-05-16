import { Controller, Get, Post, Body, Patch, Param, Delete,Version, VERSION_NEUTRAL, } from '@nestjs/common';
import { FeishuService } from './feishu.service';
import { CreateFeishuDto } from './dto/create-feishu.dto';
import { UpdateFeishuDto } from './dto/update-feishu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FeishuMessageDto } from './feishu.dto';

@ApiTags('飞书')
@Controller('feishu')
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) {}
@ApiOperation({
    summary: '消息推送',
  })
  @Version([VERSION_NEUTRAL])
  @Post('sendMessage')
  sendMessage(@Body() params: FeishuMessageDto) {
    const { receive_id_type, ...rest } = params
    return this.feishuService.sendMessage(receive_id_type, rest);
  }
  @Post()
  create(@Body() createFeishuDto: CreateFeishuDto) {
    return this.feishuService.create(createFeishuDto);
  }

  @Get()
  findAll() {
    return this.feishuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feishuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeishuDto: UpdateFeishuDto) {
    return this.feishuService.update(+id, updateFeishuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feishuService.remove(+id);
  }
}
