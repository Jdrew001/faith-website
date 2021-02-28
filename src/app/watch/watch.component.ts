import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';

import videojs from 'video.js';

declare var require: any;
require('videojs-contrib-quality-levels');
require('videojs-hls-quality-selector');

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, AfterViewInit, OnDestroy {

  watchImageUrl = '';
  url: string = 'http://206.81.10.146:8080/hls/test.m3u8';
  public player: videojs.Player;
  isLive = true;

  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.watchImageUrl = this.helperService.getResourceUrl('images/worship.jpg', true);
  }

  ngAfterViewInit() {
    const options = {
      'sources': [{
        'src': this.url,
        'type': 'application/x-mpegURL'
      }
      ],
      liveui: true,
      'poster' : '../../../assets/images/live.png'
    };
    this.player = videojs('faith-tab-video', options, function onPlayerReady() {
      console.log('Player ready');
      var myPlayer = this, id = myPlayer.id();
      myPlayer.hlsQualitySelector();
    });

    this.player.on('error', (e) => {
      //this.loaderService.toggleLoader(false);
      console.log('error', e);
      this.player.hide();
      this.isLive = false;
    });

    this.player.on('loadstart', (loadstart) => {
      //this.loaderService.toggleLoader(true);
      console.log('loadstart', loadstart);
    });

    this.player.on('waiting', (waiting) => {
      //this.loaderService.toggleLoader(false);
      console.log('waiting', waiting);
    });
  }

  ngOnDestroy() {
    if (this.player != null) {
      this.player.dispose();
    }
  }

}
