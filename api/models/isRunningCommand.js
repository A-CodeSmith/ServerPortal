const ps = require('ps-node');
const { spawn } = require('child_process');

class IsRunningCommand {

    constructor(game) {
        this.game = game;
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    execute() {
        console.log(`Executing isRunning command for ${this.game.displayName}`);

        const path = this.escapeRegExp(this.game.exePath);
        const args = this.escapeRegExp(this.game.exeArgs);

        ps.lookup(
            {
                command: path,
                arguments: args,
            },
            function(err, resultList ) {
                if (err) {
                    console.log(err);
                    return({result: 'fail', error: err});
                }
                if (resultList.length != 1){
                    return({result: 'fail', error: 'Resource not found.'});
                }
                const process = resultList[0];
                console.log( 'Found PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
                return({result: 'success', value: true});
            }
        );
    }
}

module.exports = IsRunningCommand;