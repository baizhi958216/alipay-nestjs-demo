import { Module } from '@nestjs/common';
import { AlipayService } from './alipay.service';
import { AlipayController } from './alipay.controller';

@Module({
  controllers: [AlipayController],
  providers: [AlipayService],
})
export class AlipayModule {}
