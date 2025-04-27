const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Project = require("../models/project");

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Category.find(id, (err, cat) => {
    if (err) return next(err);

    Project.byCategory(id, (err, projects) => {
      if (err) return next(err);

      Category.all((err, cats) => {
        if (err) return next(err);
        res.render("category", { category: cat, projects, navCats: cats });
      });
    });
  });
});

module.exports = router;
