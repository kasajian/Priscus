var Promise = require('bluebird')
var Curl = require('node-libcurl').Curl;
var url = require('url');
var commonConfig = require('./commonconfig.js');

// Use libcurl so that we can use spnego.  This is so we can leverage Integrated Windows Authentication,
// single sign-on for HTTP requests and not require user to enter user name and password when already authenticated.
// Node doesn't have very strong kerberos support.  Some options, not easily installable are:
//     https://www.npmjs.com/package/kerberos
//     https://gist.github.com/dmansfield/c75817dcacc2393da0a7
//
// Below simulates the following curl command:
// xargs -a url.txt curl --noproxy hostname --negotiate -u  : -o o
// See "Negotiate or NTLM authentication" in curl --manual

// Example:
//     perform(createFor(url, curlOpts))
//
// Creates a curl object for the given url
// Uses credentials of signed-on user by default

function createFor(urlString, curlOpts) {
  var endpoint = urlString;
  var endpointUrl = url.parse(endpoint);
  var curl = new Curl();

  curlOpts = Object.assign({}, curlOpts);
  curlOpts['URL'] = endpoint;
  Object.keys(curlOpts).forEach(function(key) {
    curl.setOpt( key, curlOpts[key] );
  });
  if (process.env.flagLogCommand) {
    console.log("curlOpts:");
    console.dir(curlOpts);
  }
  return curl;
}

// Pass in curl returned by createFor
function perform(curl) {
  return new Promise(function (resolve, reject) {
    curl.on( 'end', function( statusCode, body, headers ) {  
        if (statusCode === 200) {
          resolve({ statusCode, body, headers });
        } else {
          reject({ statusCode, body, headers });
        }
        this.close();
    });
    curl.on( 'error', function( err, curlErrorCode ) {
      reject({error:{ err, curlErrorCode }});
      this.close();    
    });
    curl.perform();
  });
}

module.exports = {
  createFor,
  perform,
  commonConfig
};