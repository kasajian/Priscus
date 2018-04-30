// Contains some common pre-built configurations so that
// they don't have to re-built in various parts of application code
//

var Curl = require('node-libcurl').Curl;

var onPremNegotiate = {
    'USERNAME': '',
    'HTTPAUTH': Curl.auth.NEGOTIATE,
    'NOPROXY': '*',
};

var onPremNegotiatePatch = Object.assign({}, onPremNegotiate, {
    'CUSTOMREQUEST': 'PATCH',
    'HTTPHEADER': ['Content-Type: application/json-patch+json']
});

module.exports = {
    onPremNegotiate,
    onPremNegotiatePatch,
};