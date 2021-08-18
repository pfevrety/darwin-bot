/* eslint-disable padding-line-between-statements */
/* eslint-disable indent */
import { SapphireClient } from '@sapphire/framework';
import * as dotenv from 'dotenv';
import sql = require('./utils/sql');
dotenv.config();

const db = sql.openDb();

const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

client.fetchPrefix = async (message) => {
    await (await db).exec('CREATE TABLE tbl (col TEXT)');
    await (await db).exec('INSERT INTO tbl VALUES ("test")')

    const guild = await (await db).get('SELECT col FROM tbl WHERE col = ?', 'test');
    return guild?.prefix ?? '!';
}


client.login(process.env.TOKEN).then(() => console.log('Le bot est on')).catch(console.error);