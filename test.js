const {test} = require('ava');
const mock = require('mock-require');

const SCKEY = 'testsckey';
const SCKEY2 = 'testsckey2';
const TITLE = 'test for title';
const MESSAGE = 'test for message';

test('send wechat', async t => {
  t.plan(2);

  mock('process', {
    env: {
      PLUGIN_SCKEY: SCKEY,
      PLUGIN_TITLE: TITLE,
      PLUGIN_MESSAGE: MESSAGE
    }
  });
  mock('drone-render', text => {
    t.is(text, MESSAGE);
    return text + '1';
  });
  mock('request-promise-native', obj => {
    t.deepEqual(obj, {
      url: `https://sc.ftqq.com/${SCKEY}.send`,
      qs: {
        text: TITLE,
        desp: MESSAGE + '1'
      }
    });
  });

  mock.reRequire('./index.js');
  mock.stopAll();
});

test('send wechat with SERVER_CHAN_KEY', async t => {
  mock('process', {
    env: {
      SERVER_CHAN_KEY: SCKEY2,
      PLUGIN_TITLE: TITLE,
      PLUGIN_MESSAGE: MESSAGE
    }
  });
  mock('request-promise-native', obj => {
    t.is(obj.url, `https://sc.ftqq.com/${SCKEY2}.send`);
  });

  mock.reRequire('./index.js');
  mock.stopAll();
});
