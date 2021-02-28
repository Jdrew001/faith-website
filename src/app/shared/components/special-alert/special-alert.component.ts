import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SpecialAlertService } from './special-alert.service';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-special-alert',
  templateUrl: './special-alert.component.html',
  styleUrls: ['./special-alert.component.css']
})
export class SpecialAlertComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal:any;
  announcement: {show: boolean, description: string, timeout: number};

  constructor(private specialService: SpecialAlertService) { }

  ngOnInit() {
    this.specialService.fetchSpecialAnnouncement().subscribe((res: any) => {
      this.announcement = res;

      this.announcement.show ? this.modal.show(): '';
      console.log(this.announcement.timeout);
      setTimeout(() => {this.modal.hide()}, this.announcement.timeout);
    });
    // this.dialogSub = this.specialService.specialAlert$.subscribe(() => {

    //   this.modal.show();

    //   setTimeout(() => {
    //     this.modal.hide();
    //   }, 10000);
    // });
  }

  ngOnDestroy() {
  }

}
