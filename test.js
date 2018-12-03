const { test } = require('ava');
const mock = require('mock-require');

// const SCKEY = 'testsckey';
// const SCKEY2 = 'testsckey2';
const TITLE = 'test for title';
const MESSAGE = 'test for message';

// test('send wechat with serverchan', async t => {
//   t.plan(2);

//   mock('process', {
//     env: {
//       PLUGIN_SCKEY: SCKEY,
//       PLUGIN_TITLE: TITLE,
//       PLUGIN_MESSAGE: MESSAGE
//     }
//   });
//   mock('drone-render', text => {
//     t.is(text, MESSAGE);
//     return text + '1';
//   });
//   mock('request-promise-native', obj => {
//     t.deepEqual(obj, {
//       url: `https://sc.ftqq.com/${SCKEY}.send`,
//       qs: {
//         text: TITLE,
//         desp: MESSAGE + '1'
//       }
//     });
//   });

//   mock.reRequire('./index.js');
//   mock.stopAll();
// });

test('get wechat corp access token', async t => {
  t.plan(3);

  mock('process', {
    env: {
      PLUGIN_CORPID: 111,
      PLUGIN_CORP_SECRET: 222,
      PLUGIN_TITLE: TITLE,
      PLUGIN_MESSAGE: MESSAGE
    }
  });
  mock('request-promise-native', obj => {
    if (obj.url.includes('gettoken')) {
      t.deepEqual(obj, {
        url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
        qs: {
          corpid: 111,
          corpsecret: 222
        },
        json: true
      });
    }

    return Promise.resolve({ access_token: 1234 });
  });
  const wechat = mock.reRequire('./index');
  t.is(1234, await wechat.getAccessToken());
  mock.stopAll();
});

test('send wechat with corp id', async t => {
  mock('process', {
    env: {
      PLUGIN_TITLE: TITLE,
      PLUGIN_MESSAGE: MESSAGE,
      PLUGIN_TO_PARTY: 'party',
      PLUGIN_TO_TAG: 'tag',
      PLUGIN_MSG_URL: '',
      PLUGIN_BTN_TEXT: 'more',
      PLUGIN_AGENT_ID: 1122
    }
  });
  mock('request-promise-native', obj => {
    if (obj.url.includes('gettoken')) {
      return Promise.resolve({ access_token: 1234 });
    }
    if (obj.url.includes('send')) {
      t.deepEqual(obj, {
        method: 'POST',
        url: 'https://qyapi.weixin.qq.com/cgi-bin/message/send',
        qs: {
          access_token: 1234
        },
        body: {
          touser: '@all',
          toparty: 'party',
          tag: 'tag',
          msgtype: 'textcard',
          agentid: 1122,
          safe: 0,
          textcard: {
            title: TITLE,
            description: MESSAGE,
            url: '',
            btntext: 'more'
          }
        },
        json: true
      });
    }
  });
  mock.reRequire('./index');
  mock.stopAll();
});

test('send wechat', async t => {
  mock('process', {
    env: {
      PLUGIN_TITLE: TITLE,
      PLUGIN_MESSAGE: MESSAGE
    }
  });
  mock('request-promise-native', obj => {
    if (obj.url.includes('gettoken')) {
      return Promise.resolve({ errcode: 1, errmsg: 123 });
    }
    if (obj.url.includes('send')) {
      t.fail();
    }
  });

  mock.reRequire('./index');
  await new Promise(resolve => setTimeout(resolve, 2000)).then(() => t.pass());
  mock.stopAll();
});
