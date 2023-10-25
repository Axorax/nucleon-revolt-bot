const rate = require("../../../scripts/rate.js");

module.exports.run = (client, message, args, m) => {
  rate(message, m, "💨・Stank rate", "stanky!");
};
