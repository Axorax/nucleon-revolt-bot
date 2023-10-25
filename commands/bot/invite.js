const utils = require("../../utils.js");

module.exports.run = (client, message, args, userMsg) => {
  try {
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `Invite ${client.user.username}`,
          description: `\`https://app.revolt.chat/bot/01GVK8WRSG2J876G90EFDPEQTX\`

**[Bot Invite Link](https://app.revolt.chat/bot/01GVK8WRSG2J876G90EFDPEQTX)**
        
**[Revolt Server](https://app.revolt.chat/invite/01GVK81S6KZJF5E0EVDGD75AHH)** — **[Discord server](https://discord.gg/nKUFghjXQu)** — **[Matrix room](https://matrix.to/#/#axorax:matrix.org)**
**[Instagram](https://www.instagram.com/axorax_/)** — **[Twitter](https://twitter.com/axorax_)** — **[Patreon](https://www.patreon.com/axorax)**`,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
