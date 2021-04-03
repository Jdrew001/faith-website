import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';

import videojs from 'video.js';
import { WatchService } from './watch.service';
import { WatchContent } from './watch.model';
import { ScrollService } from '../shared/scroll.service';

declare var require: any;
require('videojs-contrib-quality-levels');
require('videojs-hls-quality-selector');

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  } 

  watchImageUrl = '';
  url: string = 'http://206.81.10.146:8080/hls/test.m3u8';
  public player: videojs.Player;
  isLive = true;
  watchContent = new WatchContent();

  constructor(
    private helperService: HelperService,
    private watchService: WatchService,
    private scrollService: ScrollService
  ) { }

  ngOnInit() {
    this.loadWatchContent();
  }

  loadWatchContent() {
    this.watchService.fetchWatchContent().subscribe(val => {
      console.log(val);
      this.watchContent = val;
      this.watchImageUrl = this.helperService.getCMSResource(this.watchContent.image.url);
    }, err => {
      this.watchImageUrl = this.helperService.getResourceUrl(this.watchContent.image.url, true);
    });
  }

  ngAfterViewInit() {
    const options = {
      'sources': [{
        'src': this.url,
        'type': 'application/x-mpegURL'
      }
      ],
      liveui: true,
      'poster' : '../../../assets/images/livestream.jpg'
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
