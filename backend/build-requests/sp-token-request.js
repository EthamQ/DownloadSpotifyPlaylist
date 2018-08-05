const spotifyAuthInfo = require('../provide-values/spotify-auth-info').spAuthInfo;
const requestBuilder = require('./request-builder');
module.exports = class SpotifyTokenRequest {

    constructor(code) {
        this.requestDetails = {
            'grant_type': 'authorization_code',
            'client_id': spotifyAuthInfo.client_id,
            'client_secret': spotifyAuthInfo.client_secret,
            'redirect_uri': spotifyAuthInfo.redirect_uri,
            'code': code,
        }
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }

    getRequestBody(callback) {
        requestBuilder.buildRequestBody(this.requestDetails, requestBody => {
            callback({requestBody: requestBody, headers: this.headers});
        });
    }
}
