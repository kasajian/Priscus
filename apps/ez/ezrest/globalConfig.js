// Various default options used throughout, and don't need to be specified.
//

var commonConfig = require('./ezCurl/commonConfig.js');

// Always use these additional urlPathArgs when constructing path
module.exports.defaultUrlBasePath = function() { return process.env.urlBasePath; };

// Always use these additional urlPathArgs when constructing path
module.exports.defaultUrlPathArgs = function() { return {'teamPrj':process.env.tfsTeamPrj}; };

// Always use these additional urlPathArgs when constructing path
module.exports.defaultUrlQuery = function() { return {'api-version':'1.0'}; };
