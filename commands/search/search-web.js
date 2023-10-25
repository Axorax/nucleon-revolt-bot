const utils = require("../../utils.js");

module.exports.run = (c, message, a, m) => {
  try {
    if (String(m).trim().length === 0) {
      return message.reply("Provide a search query!");
    }
    const t = encodeURIComponent(m);
    message.reply({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `search web`,
          description: `**Query:** \`${m}\`

**Results:**
[[ Google ]](https://www.google.com/search?q=${t})
[[ Bing ]](https://www.bing.com/search?q=${t})
[[ DuckDuckGo ]](https://duckduckgo.com/?q=${t})
[[ yahoo ]](https://search.yahoo.com/search?p=${t})
[[ you.com ]](https://you.com/search?q=${t})
[[ startpage ]](https://www.startpage.com/sp/search?q=${t})`,
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
};
