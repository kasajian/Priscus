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

var onPremNegotiatePatch = Object.assign({}, onPremNegotiate, curlPatch);

var basicAuthPatch = Object.assign({}, basicAuth, curlPatch);

module.exports = {
    onPremNegotiate,
    onPremNegotiatePatch,
    basicAuth,
    basicAuthPatch
};