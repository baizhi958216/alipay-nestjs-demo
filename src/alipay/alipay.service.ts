import { Injectable } from '@nestjs/common';
import AliPayForm from 'alipay-sdk/lib/form';
import alipaySdk from 'src/utils/alipay.util';

@Injectable()
export class AlipayService {
  async getPayUrl(ProductName: string, ProductValue: string) {
    const bizContent = {
      out_trade_no: Date.now(),
      product_code: 'FAST_INSTANT_TRADE_PAY',
      subject: ProductName,
      body: '234',
      total_amount: ProductValue,
    };
    const result = await alipaySdk.pageExec('alipay.trade.page.pay', {
      method: 'POST',
      bizContent,
      returnUrl: 'http://localhost:5174/#/payresult',
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
      const result = alipaySdk.exec(
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
