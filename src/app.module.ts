import { Module } from '@nestjs/common';
import { AlipayModule } from './alipay/alipay.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AlipayModule],
})
export class AppModule {}
