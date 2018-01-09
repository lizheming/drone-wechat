<img src="wechat.svg" />

## drone-wechat
[![Travis](https://img.shields.io/travis/lizheming/drone-wechat.svg)]()
[![Coverage Status](https://coveralls.io/repos/github/lizheming/drone-wechat/badge.svg?branch=master)](https://coveralls.io/github/lizheming/drone-wechat?branch=master)
[![Docker Pulls](https://img.shields.io/docker/pulls/lizheming/drone-wechat.svg)]()
[![](https://images.microbadger.com/badges/image/lizheming/drone-wechat.svg)](https://microbadger.com/images/lizheming/drone-wechat)
[![GitHub release](https://img.shields.io/github/release/lizheming/drone-wechat.svg)]()

Drone plugin for sending wechat notifications. 

## Description

This drone wechat notification plugin builds base on Wechat for Work. You can config your own wechat corp id, or you can get wechat notification quickly with key from [ServerChan](http://sc.ftqq.com). If you use  [ServerChan](http://sc.ftqq.com) you need get `SCKEY` before using. After login with Github account you can get `SCKEY` at http://sc.ftqq.com/?c=code.

Read this in other languages: [English](README.md), [简体中文](README.zh-cn.md).

## Environment

- `PLUGIN_CORPID`: The corpid for authorization
- `WECHAT_CORPID`: alias for `PLUGIN_CORPID`
- `PLUGIN_CORP_SECRET`: The corp secret for authorization
- `WECHAT_CORP_SECRET`: alias for `PLUGIN_CORP_SECRET`
- `PLUGIN_AGENT_ID`: The agent id to send the message
- `WECHAT_AGENT_ID`: alias for `PLUGIN_AGENT_ID`
- `PLUGIN_TO_PARTY`: The party ids to send the message
- `WECHAT_TO_PARTY`: alias for `PLUGIN_TO_PARTY`
- `PLUGIN_TO_USER`: The user ids to send the message to
- `WECHAT_TO_USER`: alias for `PLUGIN_TO_USER`
- `PLUGIN_TO_TAG`: The tag ids to send the message to
- `WECHAT_TO_TAG`: alias for `PLUGIN_TO_TAG`
- `PLUGIN_SAFE`:  encrypt message, default is false
- `PLUGIN_MSG_URL`: The link for the text card click
- `PLUGIN_BTN_TEXT`: The text for the button on the card
- `PLUGIN_SCKEY`: SCKEY get from [ServerChan](http://sc.ftqq.com)
- `WECHAT_SCKEY`: alias for `PLUGIN_SCKEY`
- `PLUGIN_TITLE`: Notification title
- `PLUGIN_MESSAGE`: Notification body message, support markdown.

## Usage

### With wechat corp id

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

### With server chan key

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