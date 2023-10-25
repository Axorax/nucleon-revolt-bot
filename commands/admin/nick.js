// const checkMod = require("../../scripts/mod.js");
// const utils = require("../../utils.js");
// module.exports.run = async (client, message, args, userMsg) => {
//   try {
//     await checkMod(client, message, "TimeoutMembers");
//     try {
//     let member = message.mentionIds
//         ? await message.channel.server.fetchMember(message.mentionIds[0])
//         : /[0-9A-Z]{26}/.test(userMsg)
//         ? await message.channel.server.fetchMember(userMsg)
//         : null
//       if (member == null) return message.reply("Ping someone or enter an ID!");
//       args.shift();
//       const name = args.join(" ").replaceAll(' ', '') == '' ? null : args.join(" ");
//       member.edit({
//         nickname: name,
//         remove: undefined
//       }).then(e => {
// message.reply(`✅ | <@${member.id.user}>'s nickname has been changed!`);
//       })
//     } catch (e) {
//       message.channel.sendMessage("Invalid command usage!");
//       console.log(e);
//     }
//   } catch (error) {
//     message.channel.sendMessage("Invalid command usage!");
//     console.log(error);
//   }
// };
