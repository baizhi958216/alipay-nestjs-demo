import { Module } from '@nestjs/common';
import { AlipayModule } from './alipay/alipay.module';

@Module({
  imports: [AlipayModule],
})
export class AppModule {}
