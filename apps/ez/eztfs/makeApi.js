// An missing API can be easily added by adding its configuration to this list.
function makeApi(curlOpts) {
    return {
        // Get changeset information.
        //
        // Example:
        //
        // tfs.tfsGetChangeset([263682], {}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetChangeset: {urlPathTpl:'{urlBasePath}/_apis/tfvc/changesets/{id}', curlOpts:curlOpts.get},

        // Get work item information.
        //
        // Example:
        //
        // tfs.tfsGetWorkItem([], {ids:472884,fields:"System.Id,System.WorkItemType,System.Title,System.State"}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetWorkItem: {urlPathTpl:'{urlBasePath}/_apis/wit/WorkItems', curlOpts:curlOpts.get},

        // Get test runs
        //
        // Example:
        //
        // tfs.tfsGetTestRuns([], {top:5,includeRunDetails:true}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetTestRuns: {urlPathTpl:'{urlBasePath}/{teamPrj}/_apis/test/runs', curlOpts:curlOpts.get},

        // Get rest results
        //
        // Example:
        //
        // tfs.tfsGetTestResults({urlPathArgs:[207812], urlQuery:{detailsToInclude:'WorkItems,Iterations',$top:1}}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetTestResults: {urlPathTpl:'{urlBasePath}/{teamPrj}/_apis/test/runs/{testRunId}/results', urlQuery:{ 'api-version': '3.0' }, curlOpts:curlOpts.get},

        // Get Work Plans
        // Example:
        // tfs.tfsGetWorkPlans().then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetWorkPlans:  {urlPathTpl:'{urlBasePath}/{teamPrj}/_apis/work/plans', urlQuery:{ 'api-version': '3.0-preview' }, curlOpts:curlOpts.get},

        // Get Build Settings
        // Example:
        // tfs.tfsGetBuildSettings().then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetBuildSettings:  {urlPathTpl:'{urlBasePath}/_apis/build/settings', urlQuery:{ 'api-version': '3.0' }, curlOpts:curlOpts.get},

        // Get Build Options
        //
        // Example:
        //
        // tfs.tfsGetBuildOptions().then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetBuildOptions:  {urlPathTpl:'{urlBasePath}/_apis/build/options', urlQuery:{ 'api-version': '3.0' }, curlOpts:curlOpts.get},

        // Get build definitions
        //
        // Example:
        //
        // tfs.tfsGetBuildDefinitions({urlQuery:{name:'BuildAll.Dev.Integration'}}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetBuildDefinitions:  {urlPathTpl:'{urlBasePath}/{teamPrj}/_apis/build/definitions', urlQuery:{ 'api-version': '2.0' }, curlOpts:curlOpts.get},

        // Get builds
        //
        // Example:
        //
        // tfs.tfsGetBuilds({urlQuery:{definitions:1632,statusFilter:'completed',$top:2}}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetBuilds:  {urlPathTpl:'{urlBasePath}/{teamPrj}/_apis/build/builds', urlQuery:{ 'api-version': '2.0' }, curlOpts:curlOpts.get},

        // Get Team Project list
        //
        // Example:
        //
        // tfs.tfsGetTeamProjects({urlQuery:{$top:2}}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetTeamProjects:  {urlPathTpl:'{urlBasePath}/_apis/projects', curlOpts:curlOpts.get},

        // Get Team Project list
        //
        // Example:
        //
        // tfs.tfsGetTeams({urlPathArgs:['accfef67-5f85-4ee3-a1e4-5e54ac36a4ad'],urlQuery:{$top:2}}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsGetTeams:  {urlPathTpl:'{urlBasePath}/_apis/projects/{projectId}/teams', urlQuery:{ 'api-version': '3.0' }, curlOpts:curlOpts.get},

        // Get Team Project list
        //
        // Example:
        //
        // var postFields = [ {
        //     "op": "add",
        //     "path": "/fields/System.Tags",
        //     "value": "dummytag1_dontremove"
        // } ];
        // tfs.tfsUpdateWorkItem({urlPathArgs:[506661],curlOpts:{'POSTFIELDS':JSON.stringify(postFields)}}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsUpdateWorkItem:  {urlPathTpl:'{urlBasePath}/_apis/wit/workitems/{id}', curlOpts:curlOpts.patch},

        // Get Team Project list
        //
        // Example:
        //
        // var postFields = [ {
        //     "op": "add", 
        //     "path": "/fields/System.Title",
        //     "value": "sample task with title"
        // } ];        
        // tfs.tfsProjUpdateWorkItem({urlPathArgs:{type:'Task'},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}}).then(function(data) {
        //     console.dir(JSON.parse(data.body));
        // });
        tfsProjUpdateWorkItem:  {urlPathTpl:'{urlBasePath}/{teamPrj}/_apis/wit/workitems/${type}', curlOpts:curlOpts.patch}
    };
}

module.exports = makeApi;