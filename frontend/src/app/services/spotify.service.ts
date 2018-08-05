import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { ConstantService } from './constant.service';
import { UrlService } from './url.service';
import { AuthenticationInfo } from '../models/auth-info';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  // https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow

  readonly authenticated$ = new BehaviorSubject<number>(-1);
  readonly authenticated = this.authenticated$.asObservable();

  authInfo: AuthenticationInfo;

  constructor(
    private http: HttpClient,
    private constantService: ConstantService,
    private urlService: UrlService
  ) {
    this.authInfo = urlService.spotifyAuthInfo;
  }

  apiBaseUrl = 'http://localhost:3000/';


  login() {
    location.href = this.getUrl();
  }

  getUrl(): string {
    let authUrl = this.authInfo.spotifyBaseUrl.concat('?');
    authUrl += 'client_id='.concat(this.authInfo.clientId);
    authUrl += '&response_type='.concat(this.authInfo.responseType);
    authUrl += '&redirect_uri='.concat(this.authInfo.redirectUrl);
    authUrl += '&scope='.concat(this.authInfo.scopes);
    authUrl += '&state='.concat(this.authInfo.state);
    return authUrl;
  }

  // TODO: error handling
  getCodeFromUrl() {
    let code = '';
    if (this.codeExists()) {
      console.log('codeExists');
      //  part after '?' are the params and they are seperated by a '&'
      const params = this.getCurrentUrl().split('?')[1].split('&');
      const codeIndex = this.getIndexOfParam(params, 'code');
      if (codeIndex >= 0) {
        const codeParam = params[codeIndex];
        // get string after 'code='
        code = codeParam.split('=', 2)[1];
        return code;
      }
    } else {
      return code;
    }
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
    return this.getCurrentUrl().includes('code');
  }

  testAuthentication() {
    const path = this.urlService.apiBaseUrl + 'spotify/authorize';
    this.http.post<any>(path, { code: this.getCodeFromUrl() }).subscribe(data => {
      console.log(data);
      this.authenticated$.next(data.success ? this.constantService.AUTHENTICATED : this.constantService.NOT_AUTHENTICATED);
    });
  }


}
