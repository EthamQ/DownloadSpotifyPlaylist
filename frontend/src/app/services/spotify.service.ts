import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  // https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow

  constructor(private http: HttpClient) { }

  apiBaseUrl = 'http://localhost:3000/';

  urlCode: string;
  spotifyBaseUrl = 'https://accounts.spotify.com/authorize/';
  clientId = '261fe497b68c48208a70d165648d21ea';
  redirectUrl = 'http://localhost:4200';
  responseType = 'code';
  state = '34fFs29kd09';
  scopes = 'user-read-private user-read-email';

  login() {
    location.href = this.getUrl();
  }

  getUrl(): string {
    let authUrl = this.spotifyBaseUrl.concat('?');
    authUrl += 'client_id='.concat(this.clientId);
    authUrl += '&response_type='.concat(this.responseType);
    authUrl += '&redirect_uri='.concat(this.redirectUrl);
    authUrl += '&scope='.concat(this.scopes);
    authUrl += '&state='.concat(this.state);
    return authUrl;
  }

  // TODO: error handling
  getCodeFromUrl() {
    //  part after '?' are the params and they are seperated by a '&'
    const params = this.getCurrentUrl().split('?')[1].split('&');
    const codeIndex = this.getIndexOfParam(params, 'code');
    const codeParam = params[codeIndex];
    // get string after 'code='
    const code = codeParam.split('=', 2)[1];
    return code;
  }

  getCurrentUrl(): string {
    return location.href;
  }

  getIndexOfParam(params: string[], lookForParam: string) {
    let codeIndex = -1;
    for (let i = 0; i < params.length; i++) {
      if (params[i].includes(lookForParam)) {
        codeIndex = i;
      }
    }
    return codeIndex;
  }

  codeExists() {
    return this.getUrl().includes('code');
  }

  proceedAuthentication() {
    console.log(this.getCodeFromUrl());
    const path = this.apiBaseUrl + 'spotify/authenticate';
    this.http.post(path, {code: this.getCodeFromUrl()}).subscribe();
  }
}
