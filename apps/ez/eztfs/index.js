var ezrest = require('ezrest');
var makeApi = require('./makeapi');
var globalConfig = require('./globalconfig');

function makeOnPremNegotiateCurlOpts() {
    return {
        get: ezrest.curlCommonConfig.onPremNegotiate,
        post: ezrest.curlCommonConfig.onPremNegotiatePost,
        put: ezrest.curlCommonConfig.onPremNegotiatePut,
        delete: ezrest.curlCommonConfig.onPremNegotiateDelete,
        patch: ezrest.curlCommonConfig.onPremNegotiatePatch
    };
}

function makeBasicAuthCurlOpts(username, password) {
    return {
        get: Object.assign({}, ezrest.curlCommonConfig.basicAuth, {'USERNAME': username,'PASSWORD': password}),
        post: Object.assign({}, ezrest.curlCommonConfig.basicAuthPost, {'USERNAME': username,'PASSWORD': password}),
        put: Object.assign({}, ezrest.curlCommonConfig.basicAuthPut, {'USERNAME': username,'PASSWORD': password}),
        delete: Object.assign({}, ezrest.curlCommonConfig.basicAuthDelete, {'USERNAME': username,'PASSWORD': password}),
        patch: Object.assign({}, ezrest.curlCommonConfig.basicAuthPatch, {'USERNAME': username,'PASSWORD': password})
    };
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