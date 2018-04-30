var util = require('util');
var querystring = require('querystring');
var Promise = require('bluebird')
var urltemplate = require('url-template');
var curlToTfs = require('./ezCurl/index.js');
var globalConfig = require('./globalConfig');

// Parameter: {
//  urlPathTpl,     never undefined.  can have format string compatible with util.format, which gets arguments from urlPathArgs
//  urlPathArgs{},  may be undefined if urlPathTpl doesn't have format placeholders
//  urlQuery{},     may be undefined if url query not required.,
//  urlBasePath,    url to the team project collection, without team project name.  must end with '/'.  If undefined, env with same name is used. eg. http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/
// }
function constructUrl(p) {
    var urlBasePath =  p.urlBasePath || globalConfig.defaultUrlBasePath();
    var urlPath = urltemplate.parse(p.urlPathTpl).expand(Object.assign({}, globalConfig.defaultUrlPathArgs(), p.urlPathArgs));
    var urlQuery = Object.assign({}, globalConfig.defaultUrlQuery(), p.urlQuery);

    var url = urlBasePath + urlPath + '?' + querystring.stringify(urlQuery);;
    if (process.env.flagLogCommand) {
        console.log("url constructed: " + url);
    }
    return url;
}

// Object parameter may contain any of the properties defined for constructUrl
// Typically it will be limited to this list.
// {
//  urlPathTpl,
//  opt
// }
function makeCommand(p) {

    // The object parameter of the constructed function may contain any of the properties defined for constructUrl
    // Typically it will be limited to this list.
    // {
    //  urlPathArgs{},
    //  urlQuery{},
    //  curlOpts
    // }
    return function(pp) {
        return new Promise(function (resolve) {
            m = mergeEach(p, pp);
            var url = constructUrl(m);
            resolve(curlToTfs.curlPerform(curlToTfs.curlCreateFor(url, m.curlOpts)));
        });
    }
}

function mergeEach() {
    var m = {};
    [].slice.call(arguments).forEach(function(obj) {
        Object.keys(obj).forEach(function (key) {
            m[key] = typeof(obj[key]) === 'object' ? Object.assign({}, m[key], obj[key]) : obj[key];
        });
    });
    return m;
}

// for testing
makeCommand.constructUrl = constructUrl;
makeCommand.mergeEach = mergeEach;

module.exports = makeCommand;

