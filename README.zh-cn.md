<img src="wechat.svg" />

## drone-wechat
[![Travis](https://img.shields.io/travis/lizheming/drone-wechat.svg)]()
[![Coverage Status](https://coveralls.io/repos/github/lizheming/drone-wechat/badge.svg?branch=master)](https://coveralls.io/github/lizheming/drone-wechat?branch=master)
[![Docker Pulls](https://img.shields.io/docker/pulls/lizheming/drone-wechat.svg)]()
[![](https://images.microbadger.com/badges/image/lizheming/drone-wechat.svg)](https://microbadger.com/images/lizheming/drone-wechat)
[![GitHub release](https://img.shields.io/github/release/lizheming/drone-wechat.svg)]()

drone 微信消息通知插件。

其它语言版本：[English](README.md)，[简体中文](README.zh-cn.md)。

## 简介

基于 http://sc.ftqq.com/ 封装的 drone 微信消息通知插件。使用前需要去 [Server酱]( http://sc.ftqq.com/) 获取密钥。Github 登录后即可在 [发送消息](http://sc.ftqq.com/?c=code) 页面查看。

## 配置说明

- `PLUGIN_SCKEY`: SCKEY get from [ServerChan](http://sc.ftqq.com)
- `PLUGIN_TITLE`: Notification title
- `PLUGIN_MESSAGE`: Notification body message, support markdown.

## 如何使用

```
docker run --rm \
  -e PLUGIN_SCKEY=xxxx \
  -e PLUGIN_TITLE=xxxx \
  -e PLUGIN_MESSAGE=xxx \
  -e DRONE_REPO_OWNER=lizheming \
  -e DRONE_REPO_NAME=drone-wechat \
  -e DRONE_COMMIT_SHA=e5e82b5eb3737205c25955dcc3dcacc839b7be52 \
  -e DRONE_COMMIT_BRANCH=master \
  -e DRONE_COMMIT_LINK=https://github.com/lizheming/drone-wechat/compare/master... \
  -e DRONE_COMMIT_AUTHOR=lizheming \
  -e DRONE_COMMIT_AUTHOR_EMAIL=secretlzm007@gmail.com \
  -e DRONE_BUILD_NUMBER=1 \
  -e DRONE_BUILD_STATUS=success \
  -e DRONE_BUILD_LINK=http://github.com/lizheming/drone-wechat \
  -e DRONE_TAG=1.0.0 \
  -e DRONE_JOB_STARTED=1477550550 \
  -e DRONE_JOB_FINISHED=1477550750 \
  lizheming/drone-wechat
```