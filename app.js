const SlackBot = require('slackbots');
const dotenv = require('dotenv');
dotenv.config();

const bot = new SlackBot({
  token: `${ process.env.BOT_TOKEN }`,
  name: 'bot'
});

// slackbotsが追加されているチャンネルのmessageイベントをリッスン
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data)
});
// 条件を指定
const handleMessage = (data) => {
  // ループを回避
  if (data.subtype !== 'bot_message') {
    sayYeah(data);
  }
};
// 処理の実行
const sayYeah = (data) => {
  const params = {
    icon_emoji: ':cat:',
    attachments: [{
      "color": "#f2c744",
      "text": `<@${data.user}>`,
      "ts": data.ts
    }]
  };

  bot.postMessageToChannel('bundle-test', data.text, params);
};
// Error Handler
bot.on('error', err => console.log(err));
