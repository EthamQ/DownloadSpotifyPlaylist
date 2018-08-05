const spotifyAuthInfo = require('./spotify-auth-info').spAuthInfo;
const requestBuilder = require('./request-builder');
export class SpotifyTokenRequest {

    constructor(code){
        this.requestDetails = {
        'grant_type': 'authorization_code',
        'client_id': spotifyAuthInfo.client_id,
        'client_secret': spotifyAuthInfo.client_secret,
        'redirect_uri': spotifyAuthInfo.redirect_uri,
        'code': code,
        }
    }

    getRequestBody(callback){
        this.requestDetails
        requestBuilder.buildRequestBody(this.requestDetails, requestBody =>{
            callback(requestBody);
        });
    }
}
