var express = require("express");
var router = express.Router();
const {MongoClient} = require('mongodb');

router.get("/:gameId/commands/:commandId", function(req, res, next) {
    res.send(`requested game ${req.params.gameId} with command ${req.params.commandId}`);
});

router.get("/", async function(req, res, next) {
    const uri = "mongodb://localhost:27017/servers";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    res.send("ok");
});

async function listDatabases(client){
    const collections = await client.db().collections();
    const cursor = await collections[0].find({});
    cursor.each(function(err, doc) {
        if (err) throw err;
        console.log(doc);
    });
};

module.exports = router;