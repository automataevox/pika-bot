const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, '../commandsGlobal');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

module.exports = {
    execute(commands){
    

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
};