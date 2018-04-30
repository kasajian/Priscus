var assert = require('assert');
var makeCommand = require('../makeCommand');
var constructUrl = makeCommand.constructUrl;
var mergeEach = makeCommand.mergeEach;
var tfs = require('../index.js');

process.env.urlBasePath = "http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection";
process.env.tfsTeamPrj = "Azure Website"
delete process.env.flagLogCommand


describe('tfsGetChangeset', function() {
  it('construction', function() {
    var p = {urlPathArgs:{id:263682}};
    var pp = tfs.api.tfsGetChangeset;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/_apis/tfvc/changesets/263682?api-version=1.0';
    assert.equal(actual, expected);            
  });
});

describe('tfsGetWorkItem', function() {
  it('construction', function() {
    var p = {urlQuery:{ids:472884,fields:"System.Id,System.WorkItemType,System.Title,System.State"}}
    var pp = tfs.api.tfsGetWorkItem;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/_apis/wit/WorkItems?api-version=1.0&ids=472884&fields=System.Id%2CSystem.WorkItemType%2CSystem.Title%2CSystem.State';
    assert.equal(actual, expected);            
  });
  it('constructionAlt', function() {
    var p = {urlQuery:{ids:472884,fields:"System Id,System.WorkItemType,System.Title,System.State"}};
    var pp = tfs.api.tfsGetWorkItem;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/_apis/wit/WorkItems?api-version=1.0&ids=472884&fields=System%20Id%2CSystem.WorkItemType%2CSystem.Title%2CSystem.State';
    assert.equal(actual, expected);            
  });
});

describe('tfsGetTestRuns', function() {
  it('construction', function() {
    var p = {urlQuery:{$top:5,includeRunDetails:true}};
    var pp = tfs.api.tfsGetTestRuns
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/Azure%20Website/_apis/test/runs?api-version=1.0&%24top=5&includeRunDetails=true';
    assert.equal(actual, expected);            
  });
});

describe('tfsGetTestResults', function() {
  it('construction', function() {
    var p = {urlPathArgs:{testRunId:207812}, urlQuery:{detailsToInclude:'WorkItems,Iterations',$top:100} };
    var pp = tfs.api.tfsGetTestResults;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/Azure%20Website/_apis/test/runs/207812/results?api-version=3.0&detailsToInclude=WorkItems%2CIterations&%24top=100';
    assert.equal(actual, expected);            
  });
});

describe('tfsGetBuildDefinitions', function() {
  it('construction', function() {
    var p = {urlQuery:{name:'BuildAll.Dev.Integration'}};
    var pp = tfs.api.tfsGetBuildDefinitions;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/Azure%20Website/_apis/build/definitions?api-version=2.0&name=BuildAll.Dev.Integration';
    assert.equal(actual, expected);            
  });
});

describe('tfsGetBuilds', function() {
  it('construction', function() {
    var p = {urlQuery:{definitions:1632,statusFilter:'completed',$top:100}};
    var pp = tfs.api.tfsGetBuilds;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/Azure%20Website/_apis/build/builds?api-version=2.0&definitions=1632&statusFilter=completed&%24top=100';
    assert.equal(actual, expected);            
  });
});

describe('tfsGetTeamProjects', function() {
  it('construction', function() {
    var p = {urlQuery:{$top:100}};
    var pp = tfs.api.tfsGetTeamProjects;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/_apis/projects?api-version=1.0&%24top=100';
    assert.equal(actual, expected);            
  });
});

describe('tfsGetTeams', function() {
  it('construction', function() {
    var p = {urlPathArgs:{projectId:'accfef67-1111-3333-2222-5e54ac36a4ad'}, urlQuery:{$top:100}};
    var pp = tfs.api.tfsGetTeams;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/_apis/projects/accfef67-1111-3333-2222-5e54ac36a4ad/teams?api-version=3.0&%24top=100';
    assert.equal(actual, expected);            
  });
});

describe('tfsUpdateWorkItem', function() {
  it('construction', function() {
    var postFields = [ {
      "op": "add",
      "path": "/fields/System.Tags",
      "value": "dummytag1_dontremove"
    } ];
    var p = {urlPathArgs:{id:506661},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}};
    var pp = tfs.api.tfsUpdateWorkItem;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/_apis/wit/workitems/506661?api-version=1.0&validateOnly=true';
    assert.equal(actual, expected);            
  });
});

describe('tfsProjUpdateWorkItem', function() {
  it('construction', function() {
    var postFields = [ {
      "op": "add", 
      "path": "/fields/System.Title",
      "value": "sample task with title"
    } ];
    var p = {urlPathArgs:{type:'Task'},curlOpts:{'POSTFIELDS':JSON.stringify(postFields)},urlQuery:{validateOnly:true}};
    var pp = tfs.api.tfsProjUpdateWorkItem;
    var actual = constructUrl(mergeEach(p, pp));
    var expected = 'http://fabrikam-fiber-inc.visualstudio.com/DefaultCollection/Azure%20Website/_apis/wit/workitems/$Task?api-version=1.0&validateOnly=true';
    assert.equal(actual, expected);            
  });
});
