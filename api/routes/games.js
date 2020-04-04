var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');

const Game = require('../models/game');
const CommandFactory = require('../models/commandFactory');

const uri = "mongodb://localhost:27017/servers";

router.get("/:gameId/commands/:command", async function(req, res, next) {

    let game = null;
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        game = await Game.findOne({gameId: parseInt(req.params.gameId, 10)});
    } catch (error) {
        console.error(error);
        return res.status(500).send({result: 'fail', error: 'Failed to connect'});
    } finally {
        await mongoose.disconnect();
    }

    if (game == null) {
        return res.status(404).send({result: 'fail', error: 'Resource not found'});
    }
    if (game.commands == null || game.commands.length == 0) {
        return res.status(404).send({result: 'fail', error: 'Unsupported command'});
    }

    const command = game.commands.find((command) => command == req.params.command);
    if (command == null) {
        return res.status(404).send({result: 'fail', error: 'Unsupported command'});
    }

    const executor = CommandFactory.create(command, game);
    if (executor == null) {
        return res.status(404).send({result: 'fail', error: 'Unsupported command'});
    }
    
    const ret = executor.execute();
    res.send(ret);
});

router.get("/", async function(req, res, next) {

    let games = null;
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        games = await Game.find();
    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }

    let response = [];
    games.forEach((game) => {
        let summary = {
            gameId: game.gameId,
            displayName: game.displayName,
            commands: game.commands
        };
        response.push(summary);
    });
    
    res.send(response);
});

module.exports = router;