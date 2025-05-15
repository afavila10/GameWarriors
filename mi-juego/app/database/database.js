const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("databaseGame.db");

// Crear las tablas y relaciones
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS WARRIOR_TYPE (
        type_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS RACE (
        race_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS POWERS (
        power_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        percentage INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS SPELLS (
        spell_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        percentage INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS WARRIOR (
        warrior_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        Total_Powers INTEGER NOT NULL,
        Total_Magic INTEGER NOT NULL,
        Health INTEGER NOT NULL,
        Speed INTEGER NOT NULL,
        Intenlligence INTEGER NOT NULL,
        Status VARCHAR NOT NULL,
        type_id INTEGER NOT NULL,
        race_id INTEGER NOT NULL,
        FOREIGN KEY (type_id) REFERENCES WARRIOR_TYPE(type_id),
        FOREIGN KEY (race_id) REFERENCES RACE(race_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS USERS (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS BATTLES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        warrior1_id INTEGER NOT NULL,
        warrior2_id INTEGER NOT NULL,
        winner_id INTEGER NOT NULL,
        round INTEGER NOT NULL,
        FOREIGN KEY (warrior1_id) REFERENCES WARRIORS(warrior_id),
        FOREIGN KEY (warrior2_id) REFERENCES WARRIORS(warrior_id),
        FOREIGN KEY (winner_id) REFERENCES WARRIORS(warrior_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS WARRIOR_POWERS (
        warrior_id INTEGER,
        power_id INTEGER,
        PRIMARY KEY (warrior_id, power_id),
        FOREIGN KEY (warrior_id) REFERENCES WARRIOR(warrior_id),
        FOREIGN KEY (power_id) REFERENCES POWERS(power_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS WARRIOR_SPELLS (
        warrior_id INTEGER,
        spell_id INTEGER,
        PRIMARY KEY (warrior_id, spell_id),
        FOREIGN KEY (warrior_id) REFERENCES WARRIOR(warrior_id),
        FOREIGN KEY (spell_id) REFERENCES SPELLS(spell_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS partidas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        conectados INTEGER DEFAULT 1,
        estado TEXT DEFAULT 'esperando',
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
