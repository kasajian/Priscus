// Contains some common pre-built configurations so that
// they don't have to re-built in various parts of application code
//

var Curl = require('node-libcurl').Curl;

var onPremNegotiate = {
    'USERNAME': '',
    'HTTPAUTH': Curl.auth.NEGOTIATE,
    'NOPROXY': '*',
};

var basicAuth = {
    'USERNAME': '',
    'PASSWORD': '',
    'HTTPAUTH': Curl.auth.BASIC,
    'NOPROXY': '*',
    'SSL_VERIFYPEER': false
};

var curlPatch = {
    'CUSTOMREQUEST': 'PATCH',
    'HTTPHEADER': ['Content-Type: application/json-patch+json']
};

var onPremNegotiatePost = Object.assign({}, onPremNegotiate, {'POST': true });
var onPremNegotiatePut = Object.assign({}, onPremNegotiate, {'CUSTOMREQUEST': 'PUT' });
var onPremNegotiateDelete = Object.assign({}, onPremNegotiate, {'CUSTOMREQUEST': 'DELETE' });
var onPremNegotiatePatch = Object.assign({}, onPremNegotiate, curlPatch);

var basicAuthPost = Object.assign({}, basicAuth, {'POST': true });
var basicAuthPut = Object.assign({}, basicAuth, {'CUSTOMREQUEST': 'PUT' });
var basicAuthDelete = Object.assign({}, basicAuth, {'CUSTOMREQUEST': 'DELETE' });
var basicAuthPatch = Object.assign({}, basicAuth, curlPatch);

module.exports = {
    onPremNegotiate, onPremNegotiatePost, onPremNegotiatePut, onPremNegotiateDelete, onPremNegotiatePatch,
    basicAuth, basicAuthPost, basicAuthPut, basicAuthDelete, basicAuthPatch
};