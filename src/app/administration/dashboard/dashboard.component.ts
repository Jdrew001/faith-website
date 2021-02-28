import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscribeService } from 'src/app/core/services/subscribe.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { UserService } from '../user/user-management/user.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable/release/utils';
import { delay } from 'rxjs/operators';
import { HelperService } from 'src/app/core/services/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imageUrl = '';

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    this.imageUrl = this.helperService.getResourceUrl('images/coming-soon-1.jpg', true);
  }

  showDialog() {
  }

}
