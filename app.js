const SlackBot = require('slackbots');
const dotenv = require('dotenv');
dotenv.config()

const bot = new SlackBot({
  token: `${ process.env.BOT_TOKEN }`,
  name: 'bot'
});

// slackbotが追加されているチャンネルのmessageイベントをリッスン
bot.on('message', (data) => {
  console.log(data)
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data)
})
// 条件を指定
const handleMessage = (data) => {
  // 第二条件を指定しない場合、ループしてしまう
  if (data.text.includes(' yeah') && data.subtype !== 'bot_message') {
    sayYeah(data);
  }
}
// 処理の実行
const sayYeah = (data) => {
  const params = {
    icon_emoji: ':dog:'
  };

  bot.postMessageToChannel('bundle-test', data.text, params);
}

// Error Handler
bot.on('error', err => console.log('from here', err));
