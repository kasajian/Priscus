// Contains some common pre-built configurations so that
// they don't have to re-built in various parts of application code
//

var Curl = require('node-libcurl').Curl;

var onPremNegotiateGet = {
    'USERNAME': '',
    'HTTPAUTH': Curl.auth.NEGOTIATE,
    'NOPROXY': '*',
};

var basicAuthGet = {
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

module.exports = {
    onPremNegotiate: {
        get: onPremNegotiateGet,
        post: Object.assign({}, onPremNegotiateGet, { 'POST': true }),
        put: Object.assign({}, onPremNegotiateGet, { 'CUSTOMREQUEST': 'PUT' }),
        delete: Object.assign({}, onPremNegotiateGet, { 'CUSTOMREQUEST': 'DELETE' }),
        patch: Object.assign({}, onPremNegotiateGet, curlPatch),
    },
    basicAuth: {
        get: basicAuthGet,
        post: Object.assign({}, basicAuthGet, { 'POST': true }),
        put: Object.assign({}, basicAuthGet, { 'CUSTOMREQUEST': 'PUT' }),
        delete: Object.assign({}, basicAuthGet, { 'CUSTOMREQUEST': 'DELETE' }),
        patch: Object.assign({}, basicAuthGet, curlPatch),
    }
};