const rate = require("../../../scripts/rate.js");

module.exports.run = (client, message, args, m) => {
  rate(message, m, "👀・Simp rate", "simp!", "a ");
};
