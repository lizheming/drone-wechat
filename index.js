const { configParser, exec } = require('./plugin');
configParser({
  corpid: {
    usage: 'The corpid for authorization',
    env: 'PLUGIN_CORPID,WECHAT_CORPID'
  },
  corp_secret: {
    usage: 'The corp secret for authorization',
    env: 'PLUGIN_CORP_SECRET,WECHAT_CORP_SECRET'
  },
  agent_id: {
    usage: 'The agent id to send the message',
    env: 'PLUGIN_AGENT_ID,WECHAT_AGENT_ID'
  },
  to_party: {
    usage: 'The party ids to send message',
    env: 'PLUGIN_TO_PARTY,WECHAT_TO_PARTY'
  },
  to_user: {
    usage: 'The user ids to send the message to',
    def: '@all',
    env: 'PLUGIN_TO_USER,WECHAT_TO_USER'
  },
  to_tag: {
    usage: 'The tag ids to send the message to',
    env: 'PLUGIN_TO_TAG,WECHAT_TO_TAG'
  },
  msg_type: {
    usage: 'The message send type',
    def: 'textcard',
    env: 'PLUGIN_MSG_TYPE'
  },
  safe: {
    usage: 'encrypt message, default is false',
    def: 0,
    env: 'PLUGIN_SAFE'
  },
  msg_url: {
    usage: 'The link for the text card click',
    env: 'PLUGIN_MSG_URL,DRONE_BUILD_LINK'
  },
  btn_text: {
    usage: 'The text for the button on the card',
    env: 'PLUGIN_BTN_TEXT'
  },
  title: {
    usage: 'Notification title',
    env: 'PLUGIN_TITLE'
  },
  message: {
    usage: 'Notification body message, support markdown',
    env: 'PLUGIN_MESSAGE'
  }
})(exec);
