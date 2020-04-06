const { spawn } = require('child_process');

class StartCommand {

    constructor(game) {
        this.game = game;
    }

    async executeAsync() {
        console.log(`Executing start command for ${this.game.displayName}`);
        
        spawn(
            this.game.startCommand,
            {
                detached: true,
                stdio: 'ignore',
                shell: true,
                windowsHide: false
            }
        );   
        return true;
    }
}

module.exports = StartCommand;