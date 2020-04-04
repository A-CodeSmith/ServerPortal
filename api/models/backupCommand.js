const fs = require('fs');
const { spawn } = require('child_process');

class BackupCommand {

    constructor(game) {
        this.game = game;
        this.zipUtility = '\"%PROGRAMFILES%\\7-Zip\\7z.exe\"';
    }

    getDestFilename() {
        const now = new Date();
        const dateString = new Date(now.getTime() - (now.getTimezoneOffset() * 60000 ))
            .toISOString()
            .split("T")[0];

        const baseName = this.game.backupDest + '\\' + dateString;
        const suffix = '-Backup.7z';
        let path = baseName + suffix;

        const maxAttempts = 10;
        let attempts = 1;
        while (fs.existsSync(path) && attempts < maxAttempts) {
            let increment = this.getCharForInt(attempts);
            path = baseName + increment + suffix;
            attempts++;
        }

        return path;
    }

    getCharForInt(n) {
        return String.fromCharCode(97 + n);
    }

    execute() {
        console.log(`Executing backup command for ${this.game.displayName}`);
        
        const destination = this.getDestFilename();
        try {
            spawn(
                zipUtility,
                ['a', destination, '-t7z', '-r', this.game.backupSource],
                {
                    detached: true,
                    stdio: 'ignore',
                    shell: true
                }
            );   
        } catch (err) {
            console.log(err);
            return({result: 'fail', error: err});
        }

        return({result: 'success'});
    }
}

module.exports = BackupCommand;