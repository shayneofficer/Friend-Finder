var express = require("express");
var app = express();
app.use(express.static("public"));
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var htmlRoutes = require("./app/routing/htmlRoutes");
app.use(htmlRoutes);

// var apiRoutes = require("./app/routing/apiRoutes");
// app.use(apiRoutes);

app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});
