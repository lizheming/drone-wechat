const process = require('process');
const render = require('drone-render');
const request = require('request-promise-native');

function log(...args) {
  const debug = process.env.PLUGIN_DEBUG;
  if (!debug) {
    return;
  }
  // eslint-disable-next-line
  console.log(...args);
}

function configParser(configs) {
  const ret = {};
  for (const configName in configs) {
    const { env, def } = configs[configName];
    if (def !== undefined) {
      ret[configName] = typeof def === 'function' ? def() : def;
    }
    env.split(/\s*,\s*/).some(envar => {
      if (process.env.hasOwnProperty(envar)) {
        ret[configName] = process.env[envar];
        return true;
      }
      return false;
    });
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
  title = render(title);
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

async function exec({ corpid, corp_secret, ...config }) {
  try {
    log('config parse end, config except corpid and corp_secret:', config);
    const access_token = await getAccessToken(corpid, corp_secret);
    log('access_token request success!');
    log('http request data:', config);
    const resp = await sendMsgFromWork({ ...config, access_token });
    log('send msg success, and http response content is:');
    log(resp);
    console.log('==Send notification to Wechat success!==');
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  configParser,
  getAccessToken,
  sendMsgFromWork,
  exec
};
