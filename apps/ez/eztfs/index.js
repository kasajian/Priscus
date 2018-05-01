var ezrest = require('ezrest');
var makeApi = require('./makeapi');
var globalConfig = require('./globalconfig');

function makeOnPremNegotiateCurlOpts() {
    return ezrest.curlCommonConfig.onPremNegotiate;
}

function makeBasicAuthCurlOpts(username, password) {
    var obj = [];
    Object.keys(ezrest.curlCommonConfig.basicAuth).forEach(function(key) {
        obj[key] = Object.assign({}, ezrest.curlCommonConfig.basicAuth[key], {'USERNAME': username,'PASSWORD': password});
    });
    return obj;
}

function makeTfs(urlBasePath, urlPathArgs, curlOpts) {
    return ezrest.makeMethods(makeApi(curlOpts), Object.assign(globalConfig, {
        defaultUrlBasePath: urlBasePath,
        defaultUrlPathArgs: urlPathArgs
    }));
}

module.exports = {
    ezrest,
    makeApi,
    globalConfig,
    makeTfs,
    curlOptsStrategy: {
        onPremNegotiate: makeOnPremNegotiateCurlOpts,
        onBasicAuth: makeBasicAuthCurlOpts,
    }
};