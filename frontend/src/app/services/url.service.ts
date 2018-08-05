import { Injectable } from '@angular/core';
import { AuthenticationInfo } from '../models/auth-info';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  // my backend
  readonly apiBaseUrl = 'http://localhost:3000/';

  // data for first authorization step, get code for spotify
  readonly spotifyAuthInfo: AuthenticationInfo = {
    spotifyBaseUrl: 'https://accounts.spotify.com/authorize/',
    clientId: '261fe497b68c48208a70d165648d21ea',
    redirectUrl: 'http://localhost:4200',
    responseType: 'code',
    state: '34fFs29kd09',
    scopes: 'user-read-private user-read-email'
  };

  constructor() { }
}
