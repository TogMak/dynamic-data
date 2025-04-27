// db/database.js
const sqlite3 = require('sqlite3').verbose();
const path    = require('path');

// Resolve to an absolute file path
const dbFile = path.join(__dirname, 'portfolio.db');

// Open in RW mode, creating the file if it doesn’t exist
const db = new sqlite3.Database(
  dbFile,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  err => {
    if (err) {
      console.error('❌ Could not open database', err);
      process.exit(1);
    }
    console.log(`✅ Connected to SQLite DB at ${dbFile}`);
  }
);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      category_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(category_id) REFERENCES categories(id)
    );
  `);
});

module.exports = db;
