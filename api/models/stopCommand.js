const Process = require('./process');

class StopCommand {

    constructor(game) {
        this.game = game;
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    async executeAsync() {
        console.log(`Executing stop command for ${this.game.displayName}`);

        const path = this.escapeRegExp(this.game.exePath);
        const args = this.escapeRegExp(this.game.exeArgs);

        return await Process.stopAsync(path, args);
    }
}

module.exports = StopCommand;