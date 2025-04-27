const express = require('express');
const router  = express.Router();
const Project = require('../models/project');
const Category = require('../models/category');


router.get('/', (req, res, next) => {
  Project.latest(5, (err, projects) => {
    if (err) return next(err);
    Category.all((err, cats) => {
      if (err) return next(err);
      res.render('home', { projects, navCats: cats });
    });
  });
});

module.exports = router;
