import { SapphireClient } from '@sapphire/framework';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

client.fetchPrefix = () => '!';

client.login(process.env.TOKEN).then(() => console.log('Le bot est on')).catch(console.error);