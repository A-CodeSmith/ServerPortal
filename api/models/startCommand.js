const { spawn } = require('child_process');

class StartCommand {

    constructor(game) {
        this.game = game;
    }

    execute() {
        console.log(`Executing start command for ${this.game.displayName}`);

        try {
            spawn(this.game.startCommand, {
                detached: true,
                stdio: 'ignore',
                shell: true,
                windowsHide: false
            });   
        } catch (err) {
            console.log(err);
            return({result: 'fail', error: err});
        }

        return({result: 'success'});
    }
}

module.exports = StartCommand;