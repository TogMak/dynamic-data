// routes/admin.js
const express  = require('express');
const router   = express.Router();
const Category = require('../models/category');
const Project  = require('../models/project');



// ─────────────────── DASHBOARD ───────────────────
router.get('/', (req, res, next) => {
  Category.all((err, cats) => {
    if (err) return next(err);
    Project.latest(10, (err, projs) => {
      if (err) return next(err);
      res.render('admin/dashboard', { cats, projs, navCats: cats });
    });
  });
});

// ─────────────────── CATEGORIES ───────────────────
// Show “new category” form
router.get('/categories/new', (req, res) => {
  res.render('admin/category-form');
});

// Create category
// Create category  <-- must be POST /admin/categories
router.post('/categories', (req, res, next) => {
  console.log('POST /admin/categories hit!', req.body);
  Category.create(req.body.name, err => {
    if (err) return next(err);
    res.redirect('/admin');
  });
});

// Show “edit category” form
router.get('/categories/:id/edit', (req, res, next) => {
  Category.find(req.params.id, (err, cat) => {
    if (err) return next(err);
    res.render('admin/category-form', { cat });
  });
});

// Update category
router.put('/categories/:id', (req, res, next) => {
  Category.update(req.params.id, req.body.name, err => {
    if (err) return next(err);
    res.redirect('/admin');
  });
});

// Delete category
router.delete('/categories/:id', (req, res, next) => {
  Category.delete(req.params.id, err => {
    if (err) return next(err);
    res.redirect('/admin');
  });
});

// ─────────────────── PROJECTS ───────────────────
// Show “new project” form
router.get('/projects/new', (req, res, next) => {
  Category.all((err, cats) => {
    if (err) return next(err);
    res.render('admin/project-form', { cats });
  });
});

// Create project
router.post('/projects', (req, res, next) => {
  Project.create(req.body, err => {
    if (err) return next(err);
    res.redirect('/admin');
  });
});

// Show “edit project” form
router.get('/projects/:id/edit', (req, res, next) => {
  Category.all((err, cats) => {
    if (err) return next(err);
    Project.find(req.params.id, (err, proj) => {
      if (err) return next(err);
      res.render('admin/project-form', { proj, cats });
    });
  });
});

// Update project
router.put('/projects/:id', (req, res, next) => {
  Project.update(req.params.id, req.body, err => {
    if (err) return next(err);
    res.redirect('/admin');
  });
});

// Delete project
router.delete('/projects/:id', (req, res, next) => {
  Project.delete(req.params.id, err => {
    if (err) return next(err);
    res.redirect('/admin');
  });
});


module.exports = router;
