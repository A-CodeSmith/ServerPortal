const Process = require('./process');

class IsRunningCommand {

    constructor(game) {
        this.game = game;
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    async executeAsync() {
        console.log(`Executing isRunning command for ${this.game.displayName}`);

        const path = this.escapeRegExp(this.game.exePath);
        const args = this.escapeRegExp(this.game.exeArgs);

        return await Process.findAsync(path, args);
    }
}

module.exports = IsRunningCommand;