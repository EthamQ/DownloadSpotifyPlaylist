import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { ConstantService } from '../services/constant.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  constructor(private spotifyService: SpotifyService, private constantService: ConstantService) { }

  ngOnInit() {
    this.spotifyService.testAuthentication();
    this.spotifyService.authenticated.subscribe(authenticated => {
      if (authenticated === this.constantService.AUTHENTICATED) {
        console.log('authenticated');
      } else if (authenticated === this.constantService.NOT_AUTHENTICATED) {
        console.log('not authenticated');
        this.spotifyService.login();
      }
    });
  }
}
