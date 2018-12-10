const process = require('process');
const render = require('drone-render');
const request = require('request-promise-native');

const {
  PLUGIN_CORPID,
  WECHAT_CORPID,
  PLUGIN_CORP_SECRET,
  WECHAT_CORP_SECRET,
  PLUGIN_AGENT_ID,
  WECHAT_AGENT_ID,
  PLUGIN_TO_PARTY,
  WECHAT_TO_PARTY,
  PLUGIN_TO_USER,
  WECHAT_TO_USER,
  PLUGIN_TO_TAG,
  WECHAT_TO_TAG,

  PLUGIN_MSG_TYPE,
  PLUGIN_SAFE,
  PLUGIN_MSG_URL,
  PLUGIN_BTN_TEXT,

  PLUGIN_TITLE,
  PLUGIN_MESSAGE,

  DRONE_BUILD_LINK
} = process.env;

function getAccessToken() {
  const CORPID = PLUGIN_CORPID || WECHAT_CORPID;
  const CORP_SECRET = PLUGIN_CORP_SECRET || WECHAT_CORP_SECRET;

  return request({
    url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
    qs: {
      corpid: CORPID,
      corpsecret: CORP_SECRET
    },
    json: true
  }).then(resp => {
    if (!resp.access_token) {
      throw new Error(resp);
    }
    return resp.access_token;
  });
}

function sendMsgFromWork(access_token) {
  const TO_USER = PLUGIN_TO_USER || WECHAT_TO_USER || '@all';
  const TO_PARTY = PLUGIN_TO_PARTY || WECHAT_TO_PARTY;
  const TO_TAG = PLUGIN_TO_TAG || WECHAT_TO_TAG;
  const AGENT_ID = PLUGIN_AGENT_ID || WECHAT_AGENT_ID;

  const MSG_TYPE = PLUGIN_MSG_TYPE || 'textcard';
  const SAFE = PLUGIN_SAFE || 0;
  const TITLE = PLUGIN_TITLE;
  const DESCRIPTION = render(PLUGIN_MESSAGE);
  const MSG_URL = PLUGIN_MSG_URL || DRONE_BUILD_LINK;
  const BTN_TEXT = PLUGIN_BTN_TEXT;

  return request({
    method: 'POST',
    url: 'https://qyapi.weixin.qq.com/cgi-bin/message/send',
    qs: {
      access_token
    },
    body: {
      touser: TO_USER,
      toparty: TO_PARTY,
      tag: TO_TAG,
      msgtype: MSG_TYPE,
      agentid: AGENT_ID,
      safe: SAFE,
      textcard: {
        title: TITLE,
        description: DESCRIPTION,
        url: MSG_URL,
        btntext: BTN_TEXT
      }
    },
    json: true
  });
}

function sendMsgFromWechat() {
  return getAccessToken()
    .then(sendMsgFromWork)
    .catch(err => {
      console.error(err);
    });
}

sendMsgFromWechat();
module.exports = {
  getAccessToken,
  sendMsgFromWork,
  sendMsgFromWechat
};
