## drone-wechat

drone 微信消息通知插件

## 简介

基于 http://sc.ftqq.com/ 封装的 drone 微信消息通知插件。使用前需要去 [Server酱]( http://sc.ftqq.com/) 获取密钥。Github 登录后即可在 [发送消息](http://sc.ftqq.com/?c=code) 页面查看。

## 使用

```
docker run --rm \
  -e PLUGIN_SCKEY=xxxx \
  -e PLUGIN_TITLE=xxxx \
  -e PLUGIN_MESSAGE=xxx
  lizheming/drone-wechat
```