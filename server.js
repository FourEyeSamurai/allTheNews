// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var handlebars = require("handlebars");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Set Handlebars as the default templating engine.
var hbs = exphbs.create({
  defaultLayout: "main",
  partialsDir: [
    "views/partials/"]
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

// Use body parser with our app
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18day3mongoose");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// =============================================================
// Routes
// ============================================================
require("./routes/routes.js");



// Listen on port 3000
app.listen(8080, function() {
  console.log("App running on port 8080!");
});
