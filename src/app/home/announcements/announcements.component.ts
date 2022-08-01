import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { AnnouncementImplService } from './announcement-impl.service';
import { FileUtilityService } from 'src/app/shared/utilities/FileUtilities';
import { LoaderService } from 'src/app/core/loader/loader.service';

declare var require: any;
require('videojs-contrib-quality-levels');
require('videojs-hls-quality-selector');

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

  announcement: any[] = [];
  imgUrl = '';

  constructor(private helperService: HelperService, private announcementImplService: AnnouncementImplService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.loadAnnouncement()
  }

  private loadAnnouncement() {
    this.announcementImplService.getAnnouncements().subscribe(data => {
      this.announcement = data;
    });
  }

  loadImageResource() {
    return this.helperService.getResourceUrl('images/cancel.jpg', true);
  }

  loadImage(url) {
    return this.helperService.getCMSResource(url);
  }
}
