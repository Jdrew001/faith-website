import { Component, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { ServicesConstant } from './services.constant';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  imageUrl = '';
  video_list = ServicesConstant.VIDEO_LIST;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.imageUrl = this.helperService.getResourceUrl(ServicesConstant.VIDEO_BG_URL, true);
  }

}
