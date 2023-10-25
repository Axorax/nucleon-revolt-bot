const utils = require("../../utils.js");

module.exports.run = async (e, t, a, s) => {
  try {
    let n = await fetch(`https://api.chess.com/pub/player/${s}`),
      r = await n.json();
    if (0 == r.code) {
      t.reply(`**The user "${s}" does not exist!**`);
      return;
    }
    let o = await fetch(`${r.country}`),
      i = await o.json();
    t.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${s}'s chess.com information`,
          icon_url: r.avatar,
          description: `**Name:** ${r.name}
**Username:** ${r.username}
**Player ID:** ${r.player_id}

**Followers:** ${r.followers}
**Status:** ${r.status}
**League:** ${r.league}

**Streamer:** ${r.is_streamer}
**Verified:** ${r.verified}

**Joined:** ${r.joined}
**Last online:** ${r.last_online}

**Country Code:** ${i.code}
**Country:** ${i.name}

[[ Avatar Link ]](${r.avatar})`,
        },
      ],
    });
  } catch (l) {
    t.reply("**Invalid command usage!**");
  }
};
