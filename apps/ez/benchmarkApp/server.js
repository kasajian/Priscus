var eztfs = require('eztfs');

process.env.flagLogCommand=true
//delete process.env.flagLogCommand

var tfs = eztfs.makeTfs("http://swtfsss.dev.wonderware.com:8080/tfs/SimSci",  {'teamPrj':"NextGen Sim"}, eztfs.curlOptsStrategy.onPremNegotiate());

function dump(promise) {
    promise
    .then(function(data) {
        console.log('response:');
        const obj = JSON.parse(data.body);
        console.dir(obj);
    })
    .catch(function(data) {
        console.error('Error'); console.dir(data.statusCode);
        console.dir(data.body);
        console.dir(data.headers);
    });
    return promise;
}

function getBuilds(buildDefinitionName) {
    return new Promise(function (resolve, reject) {
        var buildList = [];
        tfs.tfsGetBuildDefinitions({urlQuery:{name:buildDefinitionName}}).then(function(data) { var buildDef = JSON.parse(data.body);
        var buildId = buildDef.value[0].id;
        tfs.tfsGetBuilds({urlQuery:{definitions:buildId,resultFilter:'succeeded'}}).then(function(data) { const builds = JSON.parse(data.body);
        builds.value.forEach(function(build) {
            buildList.push({buildNumber: build.buildNumber, sourceVersion: build.sourceVersion, uri: build.uri});
        });
        resolve(buildList);
        }); });
    });
}

function tryTest() {
    getBuilds('BuildAll.Dev.Benchmark').then(function(buildList) {
        buildList.forEach(function(build) {
            tfs.tfsGetTestRuns({urlQuery:{buildUri:build.uri}}).then(function(data) { var runs = JSON.parse(data.body);
            runs.value.forEach(function(run) {
                tfs.tfsGetTestRunAttachments({urlPathArgs:{runId:run.id}}).then(function(data) { const attachments = JSON.parse(data.body);
                attachments.value.forEach(function(attachment) {
                    if (attachment.attachmentType === "tmiTestRunSummary") {
                        tfs.wget(attachment.url).then(function(data) { const attachment = data.body;
                            console.log(3);
                        });
                    }
                });
                });
            });
        }); }); 
    });
}

tryTest();
