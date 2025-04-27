const db = require('../db/database');

exports.all = (cb) =>
    db.all(`SELECT * FROM categories ORDER BY name`, [], cb);

exports.find = (id, cb) =>
    db.get(`SELECT * FROM categories WHERE id = ?`, [id], cb);

exports.create = (name, cb) =>
    db.run(`INSERT INTO categories (name) VALUES (?)`, [name], cb);

exports.update = (id, name, cb) =>
    db.run(`UPDATE categories SET name = ? WHERE id = ?`, [name, id], cb);

exports.delete = (id, cb) =>
    db.run(`DELETE FROM categories WHERE id = ?`, [id], cb);