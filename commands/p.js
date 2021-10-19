const playCommand = require('./play.js');

exports.run = (client, message, args) => {
    playCommand.run(client, message, args);
}