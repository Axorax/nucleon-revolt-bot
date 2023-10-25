function generateRandomHex() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
}

function botOwner(client) {
  return client.user.bot.owner;
}

function randomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomRgba() {
  return `rgba(${randomInteger(0, 255)}, ${randomInteger(
    0,
    255
  )}, ${randomInteger(0, 255)}, ${Math.random().toFixed(1)}\)`;
}

function generateRandomRgb() {
  return `rgb(${randomInteger(0, 255)}, ${randomInteger(
    0,
    255
  )}, ${randomInteger(0, 255)}\)`;
}

function randomString(length) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = {
  generateRandomHex,
  botOwner,
  randomInteger,
  randomItemFromArray,
  generateRandomRgba,
  generateRandomRgb,
  randomString,
};
