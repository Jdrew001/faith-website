import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { FooterConstants } from './FooterConstants';
import { Router, NavigationStart } from '@angular/router';
import { SubscribeService } from 'src/app/core/services/subscribe.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  facebookImage: string;
  instagramImage: string;
  twitterImage: string;
  showFooter = true;

  constructor(private helperService: HelperService, private router: Router, private subscribeService: SubscribeService) { }

  ngOnInit() {
    this.loadAssets();
    this.validateFooter();
  }

  validateFooter() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        FooterConstants.EXCLUDED_URLS.forEach(val => {
          console.log(event.url === val);
          if (val === event.url) {
            this.showFooter = false;
            return;
          }
        });
      }
    });
  }

  buttonPressed() {
    window.open("http://maps.apple.com/?saddr=My+Location&daddr=507+E+Randol+Mill+Road+Arlington+TX+76012");
  }

  // load all the image assets
  loadAssets() {
    this.facebookImage = this.helperService.getResourceUrl(FooterConstants.FACEBOOK_IMAGE_URL, true);
    this.instagramImage = this.helperService.getResourceUrl(FooterConstants.INSTAGRAM_IMAGE_URL, true);
    this.twitterImage = this.helperService.getResourceUrl(FooterConstants.TWITTER_IMAGE_URL, true);
  }
}
