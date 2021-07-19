const fs = require('fs-extra');

module.exports.eventsFilterer = (client) => {

    let eventsCounter = 0;
  const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`./../events/${file}`);
    eventsCounter++;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    };
  };
  console.log(`${eventsCounter} events loaded`);
};
