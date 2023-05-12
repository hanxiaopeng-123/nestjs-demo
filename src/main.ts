import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {TransformInterceptor} from './common/interceptors/transform.interceptor'
import {AllExceptionsFilter} from './common/exceptions/base.exception.filter'
import {HttpExceptionFilter} from './common/exceptions/http.exception.filter'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {generateDocument} from './doc'
// declare const module: any;

async function bootstrap() { 
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: [VERSION_NEUTRAL, '1', '2'] //多个版本
  }); 
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter(),new HttpExceptionFilter())
  generateDocument(app)
  await app.listen(3001);
}
bootstrap(); 
