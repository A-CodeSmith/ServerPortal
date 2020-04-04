var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema({
    gameId: {type: Number, required: true},
    displayName: {type: String, required: true, max: 100},
    exePath: {type: String},
    exeArgs: {type: String},
    startCommand: {type: String},
    backupSource: {type: String},
    backupDest: {type: String},
    commands: [String],
}, { collection : 'games' });

module.exports = mongoose.model('Game', GameSchema);