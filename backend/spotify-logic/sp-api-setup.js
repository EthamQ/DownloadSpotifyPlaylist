apiBaseUrl = "https://api.spotify.com/v1";
clientId = "261fe497b68c48208a70d165648d21ea";
// https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-flows

exports.getUser = function(req, res){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const Http = new XMLHttpRequest();
    const url = apiBaseUrl + '/me';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
    }
}
