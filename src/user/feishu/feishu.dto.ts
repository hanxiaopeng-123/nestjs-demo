import { RECEIVE_TYPE, MSG_TYPE } from '@/helper/feishu/message';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from "class-validator";
export class FeishuMessageDto {
  @IsNotEmpty()
  @IsEnum(RECEIVE_TYPE)
  @ApiProperty({ example: 'open_id',enum:RECEIVE_TYPE})
  receive_id_type: RECEIVE_TYPE

  @IsNotEmpty()
  @ApiProperty({ example: 'ou_b18cd21a17cdfdf2df90f620dfc4e866' })
  receive_id?: string

  @IsNotEmpty()
  @ApiProperty({ example: '{\"text\":\" test content\"}' })
  content?: string
  
  @IsNotEmpty()
  @IsEnum(MSG_TYPE)
  @ApiProperty({ example: 'text', enum: MSG_TYPE })
  msg_type?: keyof MSG_TYPE
}
