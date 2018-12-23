var mysql = require("mysql");

var express = require("express");
var router = express.Router();

var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3307,
        user: "root",
        password: "root",
        database: "friends_db"
    });
}

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

router.get("/api/friends", function (req, res) {

    connection.query("SELECT * FROM profiles", function (err, results) {
        res.json(results);
    })
});

router.post("/api/friends", function (req, res) {

    var scoresString = "[";
    for (var i = 0; i < req.body.scores.length - 1; i++) {
        scoresString += req.body.scores[i] + ", ";
    }
    scoresString += req.body.scores[req.body.scores.length - 1] + "]"

    connection.query("INSERT INTO profiles SET ?",
        {
            name: req.body.name,
            photo: req.body.photo,
            scores: scoresString
        },
        function (err, results) {
            if (err) throw err;
            console.log("New profile added!");
        }
    );

    connection.query(
        "SELECT * FROM profiles",
        function (err, results) {
            if (err) throw err;

            var data = JSON.stringify(results);
            friends = JSON.parse(data);

            var currentUser = friends[friends.length - 1];
            var minDifference = 41;
            var friendIndex;

            for (var i = 0; i < friends.length - 1; i++) {
                var diff = compareScores(currentUser, friends[i]);
                if (diff < minDifference) {
                    minDifference = diff;
                    friendIndex = i;
                }
            }
            res.json(friends[friendIndex]);
        });
});

function compareScores(user, friend) {
    userScores = JSON.parse(user.scores);
    friendScores = JSON.parse(friend.scores);
    var totalDiff = 0;
    for (var i = 0; i < userScores.length; i++) {
        totalDiff += Math.abs(userScores[i] - friendScores[i]);
    }
    return totalDiff;
}

module.exports = router;