const utils = require("../../../utils.js");
module.exports.run = (client, message, args, userMsg) => {
  if (message.mentionIds) {
    try {
      userInfo(message, client.users.get(message.mentionIds[0]));
    } catch (error) {
      message.channel.sendMessage("**Invalid Ping!**");
    }
  } else if (new RegExp("[0-9A-Z]{26}").test(userMsg)) {
    try {
      userInfo(message, client.users.get(userMsg));
    } catch (error) {
      message.channel.sendMessage(
        `**Couldn't get information for ID: ${userMsg}**`
      );
    }
  } else {
    try {
      userInfo(message, client.users.get(message.authorId));
    } catch (error) {
      message.channel.sendMessage("**Invalid Command Usage!**");
    }
  }
};

function userInfo(message, user) {
  message.channel.sendMessage({
    embeds: [
      {
        colour: utils.generateRandomHex(),
        title: `Information for ${user.username}`,
        description: `**Basic**
  Username: \`${user.username}\`
  ID: \`${user.id}\`
  Created at: \`${new Date(user.createdAt).toLocaleString()}\`
  Badges: \`${user.badges}\`
  Privileged: \`${user.privileged == undefined ? "False" : "True"}\`
  
  **Avatar**
  File Name: \`${user.avatar.filename}\`
  Link: [[ Avatar ]](${user.avatarURL}) - [[ Default Avatar ]](${
          user.defaultAvatarURL
        }) - [[ Animated Avatar ]](${user.animatedAvatarURL})`,
        icon_url: `${user.avatarURL}`,
      },
    ],
  });
}
