var eztfs = require('eztfs');
var env = require('./env.json');

process.env.flagLogCommand = true;
//delete process.env.flagLogCommand

var curlOpts = {
    get: Object.assign({}, eztfs.ezrest.curlCommonConfig.basicAuth, {'USERNAME': env.curlUSERNAME,'PASSWORD': env.curlPASSWORD}),
    patch: Object.assign({}, eztfs.ezrest.curlCommonConfig.basicAuthPatch, {'USERNAME': env.curlUSERNAME,'PASSWORD': env.curlPASSWORD})
};

var tfs = eztfs.ezrest.makeMethods(eztfs.makeApi(curlOpts), Object.assign(eztfs.globalConfig, {
    defaultUrlBasePath: "https://kasajian.visualstudio.com/sandbox",
    defaultUrlPathArgs: {'teamPrj':"sandbox Team"}
}));


var samples = [];

function dump(promise) {
    promise.then(function(data) {
        console.dir(JSON.parse(data.body));
    }).catch(function(data) {
        console.dir('statusCode:' + data.statusCode);
        console.dir('body:' + data.body);
        console.dir('headers:' + data.headers);
    });
    return promise;
}

//**************************************************************/
// Sample code:
//**************************************************************/

samples.push(Sample_tfsGetChangeset);
function Sample_tfsGetChangeset() {
    console.log(); console.log("tfs.tfsGetChangeset:");
    var promise = tfs.tfsGetChangeset({urlPathArgs:{id:13}});
    return dump(promise); // replace with application logic
}


// samples.push(Sample_tfsGetWorkItem);
// function Sample_tfsGetWorkItem() {
//     console.log(); console.log("tfs.tfsGetWorkItem:");
//     var promise = tfs.tfsGetWorkItem({urlQuery:{ids:472884,fields:"System.Id,System.WorkItemType,System.Title,System.State"}});
//     return dump(promise); // replace with application logic
// }

// samples.push(Sample_tfsGetTestRuns);
// function Sample_tfsGetTestRuns() {
//     console.log(); console.log("tfs.tfsGetTestRuns:");
//     var promise = tfs.tfsGetTestRuns({urlQuery:{$top:2,includeRunDetails:true}});
//     return dump(promise); // replace with application logic
// }

// samples.push(Sample_tfsGetTestResults);
// function Sample_tfsGetTestResults() {
//     console.log(); console.log("tfs.tfsGetTestResults:");
//     var promise = tfs.tfsGetTestResults({urlPathArgs:{testRunId:207812}, urlQuery:{detailsToInclude:'WorkItems,Iterations',$top:1}});
//     return dump(promise); // replace with application logic
// }

// samples.push(Sample_tfsGetBuildDefinitions);
// function Sample_tfsGetBuildDefinitions() {
//     console.log(); console.log("tfs.tfsGetBuildDefinitions:");
//     var promise = tfs.tfsGetBuildDefinitions({urlQuery:{name:'BuildAll.Dev.Integration'}});
//     return dump(promise); // replace with application logic
// }

// samples.push(Sample_tfsGetBuilds);
// function Sample_tfsGetBuilds() {
//     console.log(); console.log("tfs.tfsGetBuilds:");
//     var promise = tfs.tfsGetBuilds({urlQuery:{definitions:1632,statusFilter:'completed',$top:2}});
//     return dump(promise); // replace with application logic
// }

// samples.push(Sample_tfsGetTeamProjects);
// function Sample_tfsGetTeamProjects() {
//     console.log(); console.log("tfs.tfsGetTeamProjects:");
//     var promise = tfs.tfsGetTeamProjects({urlQuery:{$top:2}});
//     return dump(promise); // replace with application logic
// }

// samples.push(Sample_tfsGetTeams);
// function Sample_tfsGetTeams() {
//     console.log(); console.log("tfs.tfsGetTeams:");
//     var promise = tfs.tfsGetTeams({urlPathArgs:{projectId:'accfef67-5f85-4ee3-a1e4-5e54ac36a4ad'},urlQuery:{$top:2}});
//     return dump(promise); // replace with application logic
// }

// samples.push(Sample_tfsUpdateWorkItem);
// function Sample_tfsUpdateWorkItem() {
//     console.log(); console.log("tfs.tfsUpdateWorkItem:");
//     var postFields = [ {
//         "op": "add",
//         "path": "/fields/System.Tags",
//         "value": "dummytag1_dontremove"
//     } ];
//     var promise = tfs.tfsUpdateWorkItem({urlPathArgs:{id:506661},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}});
//     return dump(promise); // replace with application logic
// }

// samples.push(Sample_tfsProjUpdateWorkItem);
// function Sample_tfsProjUpdateWorkItem() {
//     console.log(); console.log("tfs.tfsProjUpdateWorkItem:");
//     var postFields = [ {
//         "op": "add", 
//         "path": "/fields/System.Title",
//         "value": "sample task with title"
//     } ];
    
//     var promise = tfs.tfsProjUpdateWorkItem({urlPathArgs:{type:'Task'},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}});
//     return dump(promise); // replace with application logic
// }


//**************************************************************/

// Run them in sequence
function run(samplesLeft) {
    if (samplesLeft.length === 0) return;
    samplesLeft[0]().then(function() {
        run(samplesLeft.slice(1));
    })
}
run(samples);
