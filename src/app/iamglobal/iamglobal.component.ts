import { Component, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { MissionConstant } from './mission.constant';
declare var Rellax : any;

@Component({
  selector: 'app-iamglobal',
  templateUrl: './iamglobal.component.html',
  styleUrls: ['./iamglobal.component.css']
})
export class IamglobalComponent implements OnInit {

  headingImgUrl = '';
  globalImage = '';
  projectUrl = '';

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    var rellax = new Rellax('.rellax', {
      speed: 4,
      center: true,
    });
    this.headingImgUrl = this.helperService.getResourceUrl(MissionConstant.HEADING_IMAGE, true);
    this.globalImage = this.helperService.getResourceUrl(MissionConstant.GLOBAL_IMAGE, true);
    this.projectUrl = this.helperService.getResourceUrl(MissionConstant.PROJECT_IMAGE, true);
  }

}