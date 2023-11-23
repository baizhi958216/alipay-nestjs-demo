import { PartialType } from '@nestjs/mapped-types';
import { CreateAlipayDto } from './create-alipay.dto';

export class UpdateAlipayDto extends PartialType(CreateAlipayDto) {}
