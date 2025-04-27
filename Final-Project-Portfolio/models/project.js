const db = require('../db/database');

exports.latest = (limit, cb) =>
    db.all(`SELECT p.*, c.name AS category
            FROM projects p
                     JOIN categories c ON p.category_id = c.id
            ORDER BY created_at DESC LIMIT ?`, [limit], cb);

exports.byCategory = (catId, cb) =>
    db.all(`SELECT *
            FROM projects
            WHERE category_id = ?
            ORDER BY created_at DESC`, [catId], cb);

exports.find = (id, cb) =>
    db.get(`SELECT *
            FROM projects
            WHERE id = ?`, [id], cb);

exports.create = (data, cb) =>
    db.run(
        `INSERT INTO projects (title, description, image_url, category_id)
         VALUES (?, ?, ?, ?)`,
        [data.title, data.description, data.image_url, data.category_id],
        cb
    );

exports.update = (id, data, cb) =>
    db.run(
        `UPDATE projects
         SET title=?,
             description=?,
             image_url=?,
             category_id=?
         WHERE id = ?`,
        [data.title, data.description, data.image_url, data.category_id, id],
        cb
    );

exports.delete = (id, cb) =>
    db.run(`DELETE
            FROM projects
            WHERE id = ?`, [id], cb);
