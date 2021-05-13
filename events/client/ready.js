module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.channels.cache.get(`836331037712711690`).send(`:gear: Système: Démarrage terminé ! ✅`)
    },
};
