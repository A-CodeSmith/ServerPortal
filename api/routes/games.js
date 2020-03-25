var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("game 1 info");
});

module.exports = router;