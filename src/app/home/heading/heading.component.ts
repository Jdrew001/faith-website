import { Component, OnInit, Input } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HomeContent } from '../home.model';
import { HeadingConstants } from './heading.constants';
declare var Rellax : any;

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  // variables
  // tslint:disable-next-line: no-input-rename
  @Input('showMyElement') showMyElement: boolean;
  @Input() homeContent: HomeContent;
  imageUrl: string;
  videoUrl: string;
  logoUrl: string;

  // constructor
  constructor(private helperService: HelperService) { }

  // This is the proper place to "load items"
  ngOnInit() {
    this.loadAssets();
    var rellax = new Rellax('.rellax');
  }

  loadAssets() {
    // load assets in this manner
    this.imageUrl = this.helperService.getResourceUrl(HeadingConstants.background_image, true);
    this.videoUrl = this.helperService.getResourceUrl(HeadingConstants.video_url, true);
    this.logoUrl = this.helperService.getResourceUrl(HeadingConstants.logo_url, true);
  }

}
