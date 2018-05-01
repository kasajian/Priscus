var eztfs = require('eztfs');

process.env.flagLogCommand=true
//delete process.env.flagLogCommand

var tfs = eztfs.makeTfs("http://swtfsss.dev.wonderware.com:8080/tfs/SimSci",  {'teamPrj':"NextGen Sim"}, eztfs.curlOptsStrategy.onPremNegotiate());

var samples = [];

function dump(promise) {
    promise
    .then(function(data) {
        console.log('response:'); console.dir(JSON.parse(data.body));
    })
    .catch(function(data) {
        console.error('Error'); console.dir(data.statusCode);
        console.dir(data.body);
        console.dir(data.headers);
    });
    return promise;
}

//**************************************************************/
// Sample code:
//**************************************************************/

samples.push(Sample_tfsGetChangeset);
function Sample_tfsGetChangeset() {
    console.log(); console.log("tfs.tfsGetChangeset:");
    var promise = tfs.tfsGetChangeset({urlPathArgs:{id:263682}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetWorkItem);
function Sample_tfsGetWorkItem() {
    console.log(); console.log("tfs.tfsGetWorkItem:");
    var promise = tfs.tfsGetWorkItem({urlQuery:{ids:472884,fields:"System.Id,System.WorkItemType,System.Title,System.State"}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetTestRuns);
function Sample_tfsGetTestRuns() {
    console.log(); console.log("tfs.tfsGetTestRuns:");
    var promise = tfs.tfsGetTestRuns({urlQuery:{$top:2,includeRunDetails:true}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetTestResults);
function Sample_tfsGetTestResults() {
    console.log(); console.log("tfs.tfsGetTestResults:");
    var promise = tfs.tfsGetTestResults({urlPathArgs:{testRunId:207812}, urlQuery:{detailsToInclude:'WorkItems,Iterations',$top:1}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetWorkPlans);
function Sample_tfsGetWorkPlans() {
    console.log(); console.log("tfs.tfsGetWorkPlans:");
    var promise = tfs.tfsGetWorkPlans();
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetBuildSettings);
function Sample_tfsGetBuildSettings() {
    console.log(); console.log("tfs.tfsGetBuildSettings:");
    var promise = tfs.tfsGetBuildSettings();
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetBuildOptions);
function Sample_tfsGetBuildOptions() {
    console.log(); console.log("tfs.tfsGetBuildOptions:");
    var promise = tfs.tfsGetBuildOptions();
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetBuildDefinitions);
function Sample_tfsGetBuildDefinitions() {
    console.log(); console.log("tfs.tfsGetBuildDefinitions:");
    var promise = tfs.tfsGetBuildDefinitions({urlQuery:{name:'BuildAll.Dev.Integration'}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetBuilds);
function Sample_tfsGetBuilds() {
    console.log(); console.log("tfs.tfsGetBuilds:");
    var promise = tfs.tfsGetBuilds({urlQuery:{definitions:1632,statusFilter:'completed',$top:2}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetTeamProjects);
function Sample_tfsGetTeamProjects() {
    console.log(); console.log("tfs.tfsGetTeamProjects:");
    var promise = tfs.tfsGetTeamProjects({urlQuery:{$top:2}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsGetTeams);
function Sample_tfsGetTeams() {
    console.log(); console.log("tfs.tfsGetTeams:");
    var promise = tfs.tfsGetTeams({urlPathArgs:{projectId:'accfef67-5f85-4ee3-a1e4-5e54ac36a4ad'},urlQuery:{$top:2}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsUpdateWorkItem);
function Sample_tfsUpdateWorkItem() {
    console.log(); console.log("tfs.tfsUpdateWorkItem:");
    var postFields = [ {
        "op": "add",
        "path": "/fields/System.Tags",
        "value": "dummytag1_dontremove"
    } ];
    var promise = tfs.tfsUpdateWorkItem({urlPathArgs:{id:506661},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}});
    return dump(promise); // replace with application logic
}

samples.push(Sample_tfsProjUpdateWorkItem);
function Sample_tfsProjUpdateWorkItem() {
    console.log(); console.log("tfs.tfsProjUpdateWorkItem:");
    var postFields = [ {
        "op": "add", 
        "path": "/fields/Invensys.Team",
        "value": "SC SE"
    }, {
        "op": "add", 
        "path": "/fields/Microsoft.VSTS.Scheduling.RemainingWork",
        "value": "1"
    }, {
        "op": "add", 
        "path": "/fields/Microsoft.VSTS.Common.Activity",
        "value": "Development"
    }, {
        "op": "add", 
        "path": "/fields/System.Title",
        "value": "sample task with title"
    }, ];
    
    var promise = tfs.tfsProjUpdateWorkItem({urlPathArgs:{type:'Task'},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}});
    return dump(promise); // replace with application logic
}

// samples = [];
// samples.push(Sample_tfsProjUpdateWorkItem);

//**************************************************************/

// Run them in sequence
function run(samplesLeft) {
    if (samplesLeft.length === 0) return;
    samplesLeft[0]().then(function() {
        try {
            run(samplesLeft.slice(1));
        } catch (error) {
            console.error(error);            
        }
    })
}
run(samples);
