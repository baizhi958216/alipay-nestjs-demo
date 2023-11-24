import { Controller, Get, Query } from '@nestjs/common';
import { AlipayService } from './alipay.service';

@Controller('alipay')
export class AlipayController {
  constructor(private readonly alipayService: AlipayService) {}

  @Get('pay')
  getPayUrl(
    @Query('product_name') product_name: string,
    @Query('product_value') product_value: string,
  ) {
    return this.alipayService.getPayUrl(product_name, product_value);
  }

  @Get('result')
  getPayResult(
    @Query('trade_no') trade_no: string,
    @Query('out_trade_no') out_trade_no: string,
  ) {
    return this.alipayService.getPayResult(trade_no, out_trade_no);
  }
}
