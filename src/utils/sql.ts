import sqlite3 = require('sqlite3');
import { open } from 'sqlite'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function openDb () {
    return open({
        filename: '../../database.db',
        driver: sqlite3.Database,
    })
}
