import { Component, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { AboutConstant } from '../about/about.constant';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  aboutImageUrl: string;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.aboutImageUrl = this.helperService.getResourceUrl(AboutConstant.ABOUT_IMG_URL, true);
  }

}
