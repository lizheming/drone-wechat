const process = require('process');
const render = require('drone-render');
const request = require('request-promise-native');

const {
  PLUGIN_SCKEY,
  PLUGIN_TITLE,
  PLUGIN_MESSAGE,
  SERVER_CHAN_KEY
} = process.env;

const SCKEY = PLUGIN_SCKEY || SERVER_CHAN_KEY;

request({
  url: `https://sc.ftqq.com/${SCKEY}.send`,
  qs: {
    text: PLUGIN_TITLE,
    desp: render(PLUGIN_MESSAGE)
  }
});
