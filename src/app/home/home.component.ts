import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { HomeConstants } from './home.constants';
import { SpecialAlertService } from '../shared/components/special-alert/special-alert.service';
import { HomeContentService } from './home-content.service';
import { HomeContent } from './home.model';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showMyElement: boolean = false;
  mapImage: string;
  homeContent: HomeContent = new HomeContent();

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  }

  constructor(
    private helperService: HelperService,
    private specialService: SpecialAlertService,
    private homeService: HomeContentService,
    private scrollService: ScrollService
    ) { }

  ngOnInit() {
    this.loadAssets();
    this.loadHomeContent();
  }

  loadHomeContent() {
    this.homeService.fetchHomeContent().subscribe(res => {
      this.homeContent = res['Content'][0];
      this.homeContent.about.remoteImage = true;
      this.homeContent.bibleStudy.remoteImage = true;
      this.homeContent.missions.remoteImage = true;
      this.homeContent.planVisit.remoteImage = true;
    }, err => {
      this.homeContent.about.remoteImage = false;
      this.homeContent.bibleStudy.remoteImage = false;
      this.homeContent.missions.remoteImage = false;
      this.homeContent.planVisit.remoteImage = false;
    });
  }

  loadAssets() {
    this.mapImage = this.helperService.getResourceUrl(HomeConstants.MAP_IMAGE_URL, true);
  }

}
