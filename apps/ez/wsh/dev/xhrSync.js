var xhrSync = function(url) {
    var winHttp = new ActiveXObject("WinHttp.WinHttpRequest.5.1");

    winHttp.SetAutoLogonPolicy(0);
    winHttp.Open("GET", url);
    winHttp.Send();

    var success = winHttp.WaitForResponse();
    if (success) {
        return winHttp.responseText;
    }
}

module.exports = xhrSync;
