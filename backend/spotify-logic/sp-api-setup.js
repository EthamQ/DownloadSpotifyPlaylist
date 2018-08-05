const fetch = require('node-fetch');

grant_type = 'authorization_code';
client_id = '261fe497b68c48208a70d165648d21ea';
client_secret = '1ff88434fbb8418999eb0e4b9e02131';
redirect_uri = 'http://localhost:4200';
// code = 'AQA2uyaIHsQ_NAlk2a4NhxRHVe7wCj5V824kGhwWXBSVvIHfMwOUP8_n5cGioZGZJNVqZXdC76AyrcJ1aMt9eDhwvYpu0YB_fIjCxUURUg6dLgUncErZheNtVCjrUxACsc0MKkyD5_Uf030MZEJNJKa_RqEo6f038d21SBI57Wf9B9YXaRYAawoH1RdektK_SYFgkhmPtQmsS0gA8wG4FupMeNNKfa0lODg6ZqWWuA';
url = 'https://accounts.spotify.com/api/token';


buildRequestBody = function(requestDetails, callback){
    let requestBody = [];
    for (let property in requestDetails) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        requestBody.push(encodedKey + "=" + encodedValue);
      }
      requestBody = requestBody.join("&");
      callback(requestBody);
}

getToken = function(req, res) {
    let code = req.body.code;
    let details = {
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': 'http://localhost:4200',
        'code': code,
      };

      buildRequestBody(details, formBody =>{
    
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then(
            response => response.text() // .json(), etc.
            // same as function(response) {return response.text();}
        ).then(
            html => console.log(html)
        );
      });
}



// apiBaseUrl = "https://api.spotify.com/v1";
// clientId = "261fe497b68c48208a70d165648d21ea";
// // https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-flows

// exports.getUser = function(req, res){
//     var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//     const Http = new XMLHttpRequest();
//     const url = apiBaseUrl + '/me';
//     Http.open("GET", url);
//     Http.send();
//     Http.onreadystatechange=(e)=>{
//     console.log(Http.responseText)
//     }
// }

module.exports = {
    getToken: getToken
}
