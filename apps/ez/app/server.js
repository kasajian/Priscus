var eztfs = require('eztfs');

process.env.flagLogCommand=true
//delete process.env.flagLogCommand

eztfs.globalConfig.defaultUrlBasePath = "http://swtfsss.dev.wonderware.com:8080/tfs/SimSci";
eztfs.globalConfig.defaultUrlPathArgs = {'teamPrj':"NextGen Sim"};

var tfs = eztfs.ezrest.makeMethods(eztfs.api, eztfs.globalConfig);


//**************************************************************/
// Sample code:
//**************************************************************/
var samples = [];

samples.push(Sample_tfsGetChangeset);
function Sample_tfsGetChangeset() {
    console.log(); console.log("tfs.tfsGetChangeset:");
    return tfs.tfsGetChangeset({urlPathArgs:{id:263682}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    });
}

samples.push(Sample_tfsGetWorkItem);
function Sample_tfsGetWorkItem() {
    console.log(); console.log("tfs.tfsGetWorkItem:");
    return tfs.tfsGetWorkItem({urlQuery:{ids:472884,fields:"System.Id,System.WorkItemType,System.Title,System.State"}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    });
}

samples.push(Sample_tfsGetTestRuns);
function Sample_tfsGetTestRuns() {
    console.log(); console.log("tfs.tfsGetTestRuns:");
    return tfs.tfsGetTestRuns({urlQuery:{$top:2,includeRunDetails:true}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    });
}

samples.push(Sample_tfsGetTestResults);
function Sample_tfsGetTestResults() {
    console.log(); console.log("tfs.tfsGetTestResults:");
    return tfs.tfsGetTestResults({urlPathArgs:{testRunId:207812}, urlQuery:{detailsToInclude:'WorkItems,Iterations',$top:1}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    });
}

samples.push(Sample_tfsGetBuildDefinitions);
function Sample_tfsGetBuildDefinitions() {
    console.log(); console.log("tfs.tfsGetBuildDefinitions:");
    return tfs.tfsGetBuildDefinitions({urlQuery:{name:'BuildAll.Dev.Integration'}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    });
}

samples.push(Sample_tfsGetBuilds);
function Sample_tfsGetBuilds() {
    console.log(); console.log("tfs.tfsGetBuilds:");
    return tfs.tfsGetBuilds({urlQuery:{definitions:1632,statusFilter:'completed',$top:2}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    });
}

samples.push(Sample_tfsGetTeamProjects);
function Sample_tfsGetTeamProjects() {
    console.log(); console.log("tfs.tfsGetTeamProjects:");
    return tfs.tfsGetTeamProjects({urlQuery:{$top:2}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    });
}

samples.push(Sample_tfsGetTeams);
function Sample_tfsGetTeams() {
    console.log(); console.log("tfs.tfsGetTeams:");
    return tfs.tfsGetTeams({urlPathArgs:{projectId:'accfef67-5f85-4ee3-a1e4-5e54ac36a4ad'},urlQuery:{$top:2}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    });
}

samples.push(Sample_tfsUpdateWorkItem);
function Sample_tfsUpdateWorkItem() {
    console.log(); console.log("tfs.tfsUpdateWorkItem:");
    var postFields = [ {
        "op": "add",
        "path": "/fields/System.Tags",
        "value": "dummytag1_dontremove"
    } ];
    return tfs.tfsUpdateWorkItem({urlPathArgs:{id:506661},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    }).catch(function(data){
        console.dir(data.statusCode);
        console.dir(data.body);
    });
}

samples.push(Sample_tfsProjUpdateWorkItem);
function Sample_tfsProjUpdateWorkItem() {
    console.log(); console.log("tfs.tfsProjUpdateWorkItem:");
    var postFields = [ {
        "op": "add", 
        "path": "/fields/System.Title",
        "value": "sample task with title"
    } ];
    
    return tfs.tfsProjUpdateWorkItem({urlPathArgs:{type:'Task'},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}}).then(function(data) {
        console.dir(JSON.parse(data.body));
    }).catch(function(data){
        console.dir(data.statusCode);
        console.dir(data.body);
    });
}


//**************************************************************/

// Run them in sequence
function run(samplesLeft) {
    if (samplesLeft.length === 0) return;
    samplesLeft[0]().then(function() {
        run(samplesLeft.slice(1));
    })
}
run(samples);
