const process = require('process');
const render = require('drone-render');
const request = require('request-promise-native');

function configParser(configs) {
  const ret = {};
  for (const configName in configs) {
    const { env, def } = configs[configName];
    env.split(/\s*,\s*/).some(envar => {
      if (process.env.hasOwnProperty(envar)) {
        ret[configName] = process.env[envar];
        return true;
      }
      return false;
    });
    if (!ret.hasOwnProperty(configName)) {
      ret[configName] = typeof def === 'function' ? def() : def;
    }
  }

  return fn => fn(ret);
}

function getAccessToken(corpid, corpsecret) {
  return request({
    url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
    qs: { corpid, corpsecret },
    json: true
  }).then(resp => {
    if (!resp.access_token) {
      throw new Error(resp);
    }
    return resp.access_token;
  });
}

function sendMsgFromWork({
  access_token,
  to_user: touser,
  to_party: toparty,
  to_tag: tag,
  msg_type: msgtype,
  agent_id: agentid,
  msg_url: url,
  btn_text: btntext,
  message,
  safe,
  title
}) {
  const description = render(message);
  const textcard = { title, url, btntext, description };
  return request({
    method: 'POST',
    url: 'https://qyapi.weixin.qq.com/cgi-bin/message/send',
    qs: { access_token },
    body: { touser, toparty, tag, msgtype, agentid, safe, textcard },
    json: true
  });
}

function exec({ corpid, corp_secret, ...config }) {
  return getAccessToken(corpid, corp_secret)
    .then(access_token => sendMsgFromWork({ ...config, access_token }))
    .catch(err => {
      console.error(err);
    });
}

module.exports = {
  configParser,
  getAccessToken,
  sendMsgFromWork,
  exec
};
