var makeCommand = require('./makeCommand');
var api = require('./api');

module.exports = {api};
Object.keys(api).forEach(function(key) {
    module.exports[key] = makeCommand(api[key])
});
