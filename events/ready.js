const client = require("../index");

client.on("ready", () =>
    client.channels.cache
        .get(`884041623586086922`)
        .send(`:gear: Système: Démarrage terminé ! ✅`)
);
