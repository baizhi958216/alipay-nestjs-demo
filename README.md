# 基于NestJS的支付宝证书模式支付流程

## 前往支付宝沙箱下载证书

https://open.alipay.com/develop/sandbox/app

证书路径可以根据`.env`文件提及路径进行修改

- RETURN_URL: 支付完成回调URL

- APPID: 应用ID

- ALIPAY_GATEWAY: 支付宝网关

- ALIPAY_PRIVATEKEY: 支付宝私钥

- ALIPAY_ROOTCERT: 支付宝根证书

- ALIPAY_PUBLICCERT: 支付宝公钥

- ALIPAY_APPCERT: 应用公钥

## 运行测试

```bash
pnpm install

pnpm dev
```
