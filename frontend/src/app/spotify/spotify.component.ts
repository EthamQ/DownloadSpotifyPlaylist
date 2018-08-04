import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    if (this.spotifyService.codeExists()) {
      this.spotifyService.proceedAuthentication();
    } else{
      this.spotifyService.login();
    }
  }

  test() {
    this.spotifyService.getCodeFromUrl();
  }

}
