import { Component, OnInit, ViewChild } from '@angular/core';
import { AnnouncementService } from '../../announcement.service';
import { AnnouncementConstant } from '../../announcement.constant';
import { Announcement } from '../../announcement.model';
import { ReorderModel } from './a-reorder.model';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-a-reorder',
  templateUrl: './a-reorder.component.html',
  styleUrls: ['./a-reorder.component.css']
})
export class AReorderComponent implements OnInit {

  @ViewChild('modal') mdbModal: any;
  month: string = '';
  year: string = '';
  monthNum: number = 0;
  yearNum: number = 0;
  announcements: Announcement[] = [];
  reorderModel: ReorderModel = {
    month: 0,
    year: 0,
    reorders: []
  };

  constructor(private announcementService: AnnouncementService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.dialogSubscription();
  }

  dialogSubscription() {
    this.announcementService.reorderDialog$.subscribe(data => {
      this.resolveDate(data)
      this.announcements = data['announcements'];
      this.mdbModal.show();
    });
  }

  updateOrder() {
    let count = 1;
    this.reorderModel.month = this.monthNum;
    this.reorderModel.year = this.yearNum;
    this.reorderModel.reorders = [];
    this.announcements.forEach(val => {
      //val.aorder = count;
      //this.reorderModel.reorders.push({id: val.id, aorder: val.aorder});
      count++;
    });

    // once finished, call the service updating the order of the announcement
    this.announcementService.reorderAnnouncement(this.reorderModel).subscribe(data => {
      this.notificationService.displaySuccess('Successfully reordered announcements', '');
      this.announcementService.announcementSaveSubject.next(null);
      this.mdbModal.hide();
    }, error => {
      this.notificationService.displayError('Unable to reorder announcements', '');
    });
  }

  resolveDate(data) {
    this.monthNum = data.month;
    this.yearNum = data.year;
    this.month = AnnouncementConstant.MONTHS[data.month].label;
    this.year = data.year;
  }

}
