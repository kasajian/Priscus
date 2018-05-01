var ezrest = require('ezrest');
var makeapi = require('./makeapi');
var globalconfig = require('./globalconfig');

function makeTfsOnPremNegotiateStrategy(urlBasePath, urlPathArgs) {
    var curlOpts = {
        get: ezrest.curlCommonConfig.onPremNegotiate,
        post: ezrest.curlCommonConfig.onPremNegotiatePost,
        put: ezrest.curlCommonConfig.onPremNegotiatePut,
        delete: ezrest.curlCommonConfig.onPremNegotiateDelete,
        patch: ezrest.curlCommonConfig.onPremNegotiatePatch
    };

    var tfs = ezrest.makeMethods(makeapi(curlOpts), Object.assign(globalconfig, {
        defaultUrlBasePath: urlBasePath,
        defaultUrlPathArgs: urlPathArgs
    }));

    return tfs;
}

function makeTfsBasicAuthStrategy(urlBasePath, urlPathArgs, username, password) {
    var curlOpts = {
        get: Object.assign({}, ezrest.curlCommonConfig.basicAuth, {'USERNAME': username,'PASSWORD': password}),
        post: Object.assign({}, ezrest.curlCommonConfig.basicAuthPost, {'USERNAME': username,'PASSWORD': password}),
        put: Object.assign({}, ezrest.curlCommonConfig.basicAuthPut, {'USERNAME': username,'PASSWORD': password}),
        delete: Object.assign({}, ezrest.curlCommonConfig.basicAuthDelete, {'USERNAME': username,'PASSWORD': password}),
        patch: Object.assign({}, ezrest.curlCommonConfig.basicAuthPatch, {'USERNAME': username,'PASSWORD': password})
    };

    var tfs = ezrest.makeMethods(makeapi(curlOpts), Object.assign(globalconfig, {
        defaultUrlBasePath: urlBasePath,
        defaultUrlPathArgs: urlPathArgs
    }));

    return tfs;
}

module.exports = {
    ezrest,
    makeapi,
    globalconfig,
    makeTfsOnPremNegotiateStrategy,
    makeTfsBasicAuthStrategy
};