const utils = require("../../../utils.js");
module.exports.run = async (t, a, e, s, r) => {
  try {
    let n = a.mentionIds
        ? await t.users.fetch(a.mentionIds[0])
        : /[0-9A-Z]{26}/.test(s)
        ? await t.users.fetch(s)
        : await t.users.fetch(a.authorId),
      u = `https://autumn.revolt.chat/avatars/${n.avatar.id}/${n.avatar.filename}`,
      i = await r.upload.online(u);
    a.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${n.username}'s Avatar`,
          icon_url: `${u}`,
          media: i,
        },
      ],
    });
  } catch (l) {
    a.reply("Couldn't get avatar for that user!"), console.log(l);
  }
};
