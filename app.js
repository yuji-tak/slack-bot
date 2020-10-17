const SlackBot = require('slackbots');
const dotenv = require('dotenv');
dotenv.config()

const bot = new SlackBot({
  token: `${ process.env.BOT_TOKEN }`,
  name: 'bot'
});

// slackbotが追加されているチャンネルのmessageイベントをリッスン
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text)
})

const handleMessage = (message) => {
  if (message.includes(' yeah')) {
    sayYeah();
  }
}

const sayYeah = () => {
  const params = {
    icon_emoji: ':dog:'
  };

  bot.postMessageToChannel('bundle-test', '管理内チャンネルでmsg投稿がありました', params);
}

// Error Handler
bot.on('error', err => console.log('from here', err));
