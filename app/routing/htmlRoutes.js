var express = require("express");
var router = express.Router();

// A GET Route to /survey which should display the survey page.
router.get("/survey", function (err, res) {
    if (err) {
        return console.log(err);
    }


});

// A default, catch-all route that leads to home.html which displays the home page.
router.get("/", function (err, res) {
    if (err) {
        return console.log(err);
    }

    res.send()
});

module.exports = router;