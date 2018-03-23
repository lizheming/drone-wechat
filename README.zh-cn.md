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

基于微信企业号封装的 drone 微信消息通知插件。

## 配置说明

- `PLUGIN_CORPID`: 企业Id
- `WECHAT_CORPID`: `PLUGIN_CORPID` 别名
- `PLUGIN_CORP_SECRET`: 管理组的凭证密钥
- `WECHAT_CORP_SECRET`: `PLUGIN_CORP_SECRET` 别名
- `PLUGIN_AGENT_ID`: 企业应用的id，整型。可在应用的设置页面查看
- `WECHAT_AGENT_ID`: `PLUGIN_AGENT_ID` 别名
- `PLUGIN_TO_PARTY`: 部门ID列表，多个接收者用‘|’分隔，最多支持100个。
- `WECHAT_TO_PARTY`: `PLUGIN_TO_PARTY` 别名
- `PLUGIN_TO_USER`: 成员ID列表（消息接收者，多个接收者用‘|’分隔，最多支持1000个）。特殊情况：指定为@all，则向该企业应用的全部成员发送
- `WECHAT_TO_USER`: `PLUGIN_TO_USER` 别名
- `PLUGIN_TO_TAG`: 标签ID列表，多个接收者用‘|’分隔，最多支持100个。当touser为@all时忽略本参数
- `WECHAT_TO_TAG`: `PLUGIN_TO_TAG` 别名
- `PLUGIN_SAFE`:  表示是否是保密消息，0表示否，1表示是，默认0
- `PLUGIN_MSG_URL`: 点击后跳转的链接。
- `PLUGIN_BTN_TEXT`: 按钮文字。 默认为“详情”， 不超过4个文字，超过自动截断。
- `PLUGIN_TITLE`: 消息卡片标题
- `PLUGIN_MESSAGE`: 消息卡片正文，支持 Markdown。

## 如何使用

```
docker run --rm \
  -e PLUGIN_CORPID=corpid \
  -e PLUGIN_CORP_SECRET=corpsecret \
  -e PLUGIN_AGENT_ID=agentid \
  -e PLUGIN_TO_USER=userId \
  -e PLUGIN_TO_TAG=tagId \
  -e PLUGIN_TO_PARTY=toParty \
  -e PLUGIN_SAFE=1 \
  -e PLUGIN_MSG_URL=url \
  -e PLUGIN_BTN_TXT=true \
  -e PLUGIN_TITLE=title \
  -e PLUGIN_MESSAGE=description \
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