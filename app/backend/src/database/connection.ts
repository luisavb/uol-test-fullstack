
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

const sqlite = sqlite3.verbose();

const db: Database = new sqlite.Database('database.sqlite');

db.run(
    `CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        cpf TEXT NOT NULL,
        phone TEXT,
        status TEXT
    )`
);

export default db;

