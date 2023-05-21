// feishu-auth.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-custom';
import { FastifyRequest } from 'fastify'
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
@Injectable()
export class FeishuStrategy extends PassportStrategy(Strategy, 'feishu') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: FastifyRequest): Promise<Payload> {
    const q: any = req.query;
    console.log('validate')
    const user = await this.authService.validateFeishuUser(q.code as string);
    console.log('user',user)

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}