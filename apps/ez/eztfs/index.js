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
    const tfs = ezrest.makeMethods(makeApi(curlOpts), Object.assign(globalConfig, {
        defaultUrlBasePath: urlBasePath,
        defaultUrlPathArgs: urlPathArgs
    }));
    tfs.wget = function(urlString) { return ezrest.requester.wget(urlString, curlOpts.get); }
    return tfs;
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