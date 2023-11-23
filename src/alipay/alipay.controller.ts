import { Controller } from '@nestjs/common';
import { AlipayService } from './alipay.service';

@Controller('alipay')
export class AlipayController {
  constructor(private readonly alipayService: AlipayService) {}
}
