const utils = require("../../utils.js");
module.exports.run = async (client, message, args, userMsg) => {
  try {
    if (message.authorId == utils.botOwner(client)) {
      let servers = [];
      let iterator = client.servers.entries();
      for (let v = iterator.next(); !v.done; v = iterator.next()) {
        servers.push(v.value[1]);
      }
      const ids = servers.map((s) => s.id);
      const names = servers.map((s) => s.name);
      let data = "";
      for (let i = 0; i < names.length; i++) {
        data += `| ${i + 1} | ${names[i]} | ${ids[i]} | \n`;
      }
      message.channel.sendMessage(`| No. | Name | ID |
| --- | --- | --- |
${data.slice(0, -1)}`);
    } else {
      return;
    }
  } catch (error) {
    console.log(`Error with server-list:\n ${error}`);
  }
};
