const ps = require('ps-node');

class Process {

    static async findAsync(exe, args) {
        console.log(`Finding process: command=${exe}, args=${args}`);

        const psLookupAsync = () => {
            return new Promise((resolve, reject) => {
                ps.lookup(
                    {
                        command: exe,
                        arguments: args,
                    },
                    (err, resultList) => {
                        if (err) return reject(err);
                        resolve(resultList);
                    }
                )
            })
        };
        
        let resultList = await psLookupAsync();
        if (resultList.length != 1) {
            console.log('Process not found.');
            return false;
        }

        const process = resultList[0];
        console.log('Found PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
        return true;
    }

    static async stopAsync(exe, args) {
        console.log(`Stopping process: command=${exe}, args=${args}`);

        const psLookupAsync = () => {
            return new Promise((resolve, reject) => {
                ps.lookup(
                    {
                        command: exe,
                        arguments: args,
                    },
                    (err, resultList) => {
                        if (err) return reject(err);
                        resolve(resultList);
                    }
                )
            })
        };
        
        let resultList = await psLookupAsync();
        if (resultList.length != 1) {
            console.log('Process not found.');
            return false;
        }

        const process = resultList[0];
        console.log('Found PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);

        const psKillAsync = () => {
            return new Promise((resolve, reject) => {
                ps.kill(
                    process.pid,
                    {
                        signal: 'SIGINT',
                        timeout: 30
                    },
                    (err) => {
                        if (err) return reject(err);
                        resolve();
                    }
                )
            })
        };

        await psKillAsync();
        console.log('Process %s killed.', process.pid);
        return true;
    }
}

module.exports = Process;