import { Injectable } from '@nestjs/common';
import AliPayForm from 'alipay-sdk/lib/form';
import AlipaySdk from 'alipay-sdk';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AlipayService {
  private readonly alipaySdk: AlipaySdk;
  constructor(private readonly configService: ConfigService) {
    const getConfig = (key: string) => this.configService.get<string>(key);

    this.alipaySdk = new AlipaySdk({
      appId: getConfig('APPID'),
      gateway: getConfig('ALIPAY_GATEWAY'),
      privateKey: fs.readFileSync(getConfig('ALIPAY_PRIVATEKEY'), 'ascii'),
      alipayRootCertPath: getConfig('ALIPAY_ROOTCERT'),
      alipayPublicCertPath: getConfig('ALIPAY_PUBLICCERT'),
      appCertPath: getConfig('ALIPAY_APPCERT'),
    });
  }
  async getPayUrl(ProductName: string, ProductValue: string) {
    const bizContent = {
      out_trade_no: Date.now(),
      product_code: 'FAST_INSTANT_TRADE_PAY',
      subject: ProductName,
      body: ProductName,
      total_amount: ProductValue,
    };
    const result = await this.alipaySdk.pageExec('alipay.trade.page.pay', {
      method: 'POST',
      bizContent,
      returnUrl: this.configService.get<string>('ALIPAY_RETURN_URL'),
    });
    return result;
  }

  async getPayResult(trade_no: string, out_trade_no: string) {
    const formData = new AliPayForm();
    formData.setMethod('get');
    formData.addField('bizContent', {
      out_trade_no,
      trade_no,
    });
    const alipay_trade_query_response =
      await this.manualCheckNotifySign(formData);
    return {
      result: alipay_trade_query_response.alipay_trade_query_response.code,
    };
  }

  async manualCheckNotifySign(formData: AliPayForm): Promise<any> {
    return new Promise((resolve) => {
      const result = this.alipaySdk.exec(
        'alipay.trade.query',
        {},
        {
          formData: formData,
        },
      );
      result.then((res) => {
        fetch(res as string, {
          method: 'get',
        })
          .then((a) => a.json())
          .then((data) => {
            resolve(data);
          });
      });
    });
  }
}
