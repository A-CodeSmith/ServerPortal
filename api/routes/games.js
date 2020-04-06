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

    const commandName = game.commands.find((command) => command == req.params.command);
    if (commandName == null) {
        return res.status(404).send({result: 'fail', error: 'Unsupported command'});
    }

    const command = CommandFactory.create(commandName, game);
    if (command == null) {
        return res.status(404).send({result: 'fail', error: 'Unsupported command'});
    }

    try {
        const val = await command.executeAsync();
        res.send({result: 'success', value: val});
    } catch (err) {
        console.log(err);
        res.send({result: 'fail', error: err.message})
    }
});

router.get("/", async function(req, res, next) {

    let games = null;
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        games = await Game.find();
    } catch (err) {
        console.error(err);
        res.send({result: 'fail', error: err.message})
    } finally {
        await mongoose.disconnect();
    }

    if (games.length == 0) {
        res.send({result: 'fail', error: 'No supported games.'})
    }

    let summaries = [];
    games.forEach((game) => {
        let summary = {
            gameId: game.gameId,
            displayName: game.displayName,
            commands: game.commands
        };
        summaries.push(summary);
    });
    
    res.send({result: 'success', value: summaries});
});

module.exports = router;