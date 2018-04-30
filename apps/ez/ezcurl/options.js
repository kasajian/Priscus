// Various default options used throughout, and don't need to be specified.
//

var commonConfig = require('./commonConfig.js');

// if curl options aren't specified, the default set here is used.
module.exports.defaultCurlOptions = function() { return commonConfig.onPremNegotiate; };
