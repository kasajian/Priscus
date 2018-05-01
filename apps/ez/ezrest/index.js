var makeCommand = require('./makecommand');

function makeMethods(api, globalConfig) {
    var obj = {};
    Object.keys(api || {}).forEach(function(key) {
        var def = Object.assign({}, {globalConfig}, api[key]);
        obj[key] = makeCommand(def);
    });
    return obj;
}

module.exports = {
    curlCommonConfig: require('ezcurl').commonConfig,
    makeCommand,
    makeMethods
};