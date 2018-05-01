var JSON = require('json3');
var tfsGetChangeset = require('./tfsGetChangeset');
var xhrSync = require('./xhrSync');

var main = function() {
    if (WScript.Arguments.length < 1) {
        WScript.StdOut.WriteLine("Must specify changeset. Example: cscript /nologo /b cs2user.cmd.js 263666");
        WScript.Quit();
    }

    var cs = WScript.Arguments(0);

    var str = tfsGetChangeset(cs);
    var j = JSON.parse(str);
//    WScript.StdOut.WriteLine(str);
    WScript.StdOut.WriteLine("----");
    WScript.StdOut.WriteLine("Changeset Id: " + j.changesetId);
    WScript.StdOut.WriteLine("Author Display name: " + j.author.displayName);
    WScript.StdOut.WriteLine("Author Unique name: " + j.author.uniqueName);

    var str = xhrSync(j.author.url);
    var j = JSON.parse(str);
//    WScript.StdOut.WriteLine(str);

    WScript.StdOut.WriteLine("Author Id: " + j.Descriptor.Identifier);
    WScript.StdOut.WriteLine("Author IsActive: " + j.IsActive);
    WScript.StdOut.WriteLine("DN: " + j.Properties.DN);
    WScript.StdOut.WriteLine("Mail: " + j.Properties.Mail);
}

main();