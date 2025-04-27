// app.js
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
require("./db/database"); // <-- this will run your CREATE TABLE IF NOT EXISTS logic

const indexRoutes = require("./routes/index");
const categoryRoutes = require("./routes/category");
const adminRoutes = require("./routes/admin");
const Category = require("./models/category");

const app = express();

// view engine
app.engine(
  "handlebars",
  engine({
    layoutsDir: path.join(__dirname, "views", "layouts"),
    defaultLayout: "main",
    extname: ".handlebars",
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// static assets
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// routes
app.use("/", indexRoutes);
app.use("/categories", categoryRoutes);
// app.use('/admin', adminRoutes);
app.use("/admin", require("./routes/admin"));

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Listening on http://localhost:${PORT}`));
