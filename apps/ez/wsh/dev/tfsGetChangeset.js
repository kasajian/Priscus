var xhrSync = require('./xhrSync');
var tfsUrl = require('./tfsUrl');

var tfsGetChangeset = function(cs) {
    var callUrl = "_apis/tfvc/changesets/" + cs + "?api-version=1.0";
    var url = tfsUrl + callUrl;
    return xhrSync(url);
}

module.exports = tfsGetChangeset;