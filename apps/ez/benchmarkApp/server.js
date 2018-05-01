var eztfs = require('eztfs');

process.env.flagLogCommand=true
//delete process.env.flagLogCommand

var tfs = eztfs.makeTfs("http://swtfsss.dev.wonderware.com:8080/tfs/SimSci",  {'teamPrj':"NextGen Sim"}, eztfs.curlOptsStrategy.onPremNegotiate());
