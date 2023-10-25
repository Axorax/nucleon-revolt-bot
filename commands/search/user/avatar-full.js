const utils = require("../../../utils.js");
module.exports.run = async (client, message, args, userMsg, a) => {
  try {
    const user = message.mentionIds
      ? await client.users.fetch(message.mentionIds[0])
      : /[0-9A-Z]{26}/.test(userMsg)
      ? await client.users.fetch(userMsg)
      : await client.users.fetch(message.authorId);

    const url = user.avatarURL;
    const id = await a.upload.online(
      `https://autumn.revolt.chat/avatars/${user.avatar.id}/${user.avatar.filename}`
    );
    message.channel.sendMessage({
      embeds: [
        {
          colour: utils.generateRandomHex(),
          title: `${user.username}'s Avatar - ${message.author.avatar.humanReadableSize}`,
          description: `**File name:** \`${user.avatar.filename}\`
            **Links:**

            [[ with filename ]](https://autumn.revolt.chat/avatars/${user.avatar.id}/${user.avatar.filename}) — [[ avatar ]](${url}) — [[ animated ]](${user.animatedAvatarURL}) — [[ default ]](${user.defaultAvatarURL}) — [[ url ]](${message.author.avatar.url})`,
          icon_url: `${url}`,
          media: id,
        },
      ],
    });
  } catch (error) {
    message.reply("Couldn't get avatar for that user!");
    console.log(error);
  }
};
