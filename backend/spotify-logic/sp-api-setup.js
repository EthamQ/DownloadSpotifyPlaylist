const fetch = require('node-fetch');
const TokenRequest = require('../build-requests/sp-token-request');

grant_type = 'authorization_code';
client_id = '261fe497b68c48208a70d165648d21ea';
client_secret = '1ff88434fbb8418999eb0e4b9e021316';
redirect_uri = 'http://localhost:4200';
// code = 'AQA2uyaIHsQ_NAlk2a4NhxRHVe7wCj5V824kGhwWXBSVvIHfMwOUP8_n5cGioZGZJNVqZXdC76AyrcJ1aMt9eDhwvYpu0YB_fIjCxUURUg6dLgUncErZheNtVCjrUxACsc0MKkyD5_Uf030MZEJNJKa_RqEo6f038d21SBI57Wf9B9YXaRYAawoH1RdektK_SYFgkhmPtQmsS0gA8wG4FupMeNNKfa0lODg6ZqWWuA';
url = 'https://accounts.spotify.com/api/token';


buildRequestBody = function(requestDetails, callback){
    let requestBody = [];
    for (let property in requestDetails) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(requestDetails[property]);
        requestBody.push(encodedKey + "=" + encodedValue);
      }
      requestBody = requestBody.join("&");
      callback(requestBody);
}

/**
 * send the code to the spotify api and resolve the answer we get
 */
getApiTokenResponse = function(code) {
    return new Promise((resolve, reject) => {
        const tokenRequest = new TokenRequest(code);
        tokenRequest.getRequestBody(requestInfo =>{
            fetch(url, {
                method: 'POST',
                headers: requestInfo.headers,
                body: requestInfo.requestBody
              }).then( response => response.json())
              .then(apiResponse => resolve(apiResponse))
              .catch(err => {
                reject(err);
              });
        });
    });
}

/**
 * use the token we got with our code and send it to the spotify api
 */
sendToken = function(tokens){
        console.log('access token: ' + tokens.access_token); 
        console.log('refresh token: ' + tokens.refresh_token);
}

/**
 * gets code from url, uses code to get a token and then sends the token back to the api
 */
codeTokenExchange = function(req, res){
    const code = req.body.code;
    getApiTokenResponse(code).then(apiTokenResponse => {
        if(tokenReceived(apiTokenResponse)){
            const tokens = extractTokens(apiTokenResponse);
            sendToken(tokens);
        } else{
            console.log('no token received');
            // console.log(apiTokenResponse);
        }
    });
}

/**
 * does the api response contain a token?
 */
tokenReceived = function(apiTokenResponse) {
    return apiTokenResponse.hasOwnProperty('access_token');
}

/**
 * extracts the access_token and refresh_token from the api response
 * and returns them like: {access_token, refresh_token}
 */
extractTokens = function(apiTokenResponse) {
    const access_token = apiTokenResponse.access_token;
    const refresh_token = apiTokenResponse.refresh_token;
    const tokens = {
        access_token: access_token,
        refresh_token, refresh_token
    }
    return tokens;
}


module.exports = {
    codeTokenExchange: codeTokenExchange
}
