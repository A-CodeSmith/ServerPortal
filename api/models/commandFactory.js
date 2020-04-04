const BackupCommand = require('./backupCommand');
const IsRunningCommand = require('./isRunningCommand');
const StartCommand = require('./startCommand');

class CommandFactory {

    static create(commandName, game) {
        switch (commandName) {
            case 'backup':
                return new BackupCommand(game);
            case 'isRunning':
                return new IsRunningCommand(game);
            case 'start':
                return new StartCommand(game);
            default:
                console.error(`Unsupported command \'${commandName}\'`);
                return null;
        }
    }
}

module.exports = CommandFactory;