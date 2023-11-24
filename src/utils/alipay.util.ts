import AlipaySdk from 'alipay-sdk';
import * as path from 'path';
import * as fs from 'fs';

const alipaySdk = new AlipaySdk({
  appId: '9021000122691970',
  gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do',
  privateKey: fs.readFileSync(
    path.join(process.cwd(), './static/key/appPrivateKey.txt'),
    'ascii',
  ),
  alipayRootCertPath: path.join(
    process.cwd(),
    './static/key/alipayRootCert.crt',
  ),
  alipayPublicCertPath: path.join(
    process.cwd(),
    './static/key/alipayPublicCert.crt',
  ),
  appCertPath: path.join(process.cwd(), './static/key/appPublicCert.crt'),
});

export default alipaySdk;
