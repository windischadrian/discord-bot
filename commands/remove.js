const deleteCommand = require('./delete.js');

exports.run = (client, message, args) => {
    deleteCommand.run(client, message, args);
}