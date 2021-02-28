import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AnnouncementService } from '../announcement.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { isNullOrUndefined } from 'util';
import { AnnouncementConstant } from '../announcement.constant';
import { FormControl, FormGroup } from '@angular/forms';
import { DateUtils } from 'src/app/shared/utilities/DateUtilities';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-announcement-table',
  templateUrl: './announcement-table.component.html',
  styleUrls: ['./announcement-table.component.css']
})
export class AnnouncementTableComponent implements OnInit {

  @ViewChild("editBtn") editBtn: ElementRef;
  @ViewChild("addBtn") addBtn: ElementRef;
  @ViewChild("delBtn") delBtn: ElementRef;
  @ViewChild('table') table: DatatableComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  dateUtils = new DateUtils();
  selectForm: FormGroup = new FormGroup({
    month: new FormControl(this.dateUtils.getCurrentdate().month),
    year: new FormControl(this.dateUtils.getCurrentdate().year)
  });
  selectedMonth;
  selectedYear;

  columns = [
    { id: 'Id'},
    { title: 'Title' },  
    { description: 'Description' },
    { date: 'Date' }
  ];
  monthOptions = AnnouncementConstant.MONTHS;
  yearOptions = AnnouncementConstant.YEARS;
  selected = [];
  data: any[] = [];
  temp = [];
  filteredData = [];
  announcementId: number;
  selectedAnnouncement = false

  constructor(private announcementService: AnnouncementService, private notificationService: NotificationService, private loaderService: LoaderService) { }

  ngOnInit() { 
    this.fetchAnnouncementsByMonth(this.getCurrentMonthAndYear());
    this.announcementService.announcementSave$.subscribe(res => {
      this.fetchAnnouncementsByMonth(this.getCurrentMonthAndYear());
    });
  }

  fetchAnnouncementsByMonth(date) {
    this.loaderService.toggleLoader(true);
    this.announcementService.fetchAnnouncementByMonth(date).subscribe(res => {
      this.loaderService.toggleLoader(false);
      this.data = res["announcements"];
    });
  }

  applySelectedDate() {
      this.fetchAnnouncementsByMonth(this.getCurrentMonthAndYear());
  }

  deleteAnnouncement() {
    console.log(this.selected);
    this.announcementService.deleteAnnouncement(this.selected[0].id).subscribe(res => {
      this.fetchAnnouncementsByMonth(this.getCurrentMonthAndYear());
      this.notificationService.displaySuccess('Successfully deleted announcement', 'Success');
      this.removeSelected();
    });
  }

  getMonth(val) {
    return AnnouncementConstant.MONTHS[val].label;
  }

  getYear(val) {
    return AnnouncementConstant.YEARS[AnnouncementConstant.YEARS.findIndex(x => x.value === val)].label;
  }

  openDetails() {
    // call service to get individual data
    this.announcementService.fetchAnnouncement(this.announcementId).subscribe(data => {
      this.announcementService.dialogSubject.next(data);
    });
  }

  openReorder() {
    let date = this.getCurrentMonthAndYear();

    this.announcementService.reorderSubject.next({announcements: this.data, month: date.month, year: date.year});
  }

  openDetailsAdd() {
    this.announcementService.dialogSubject.next(null);
  }

  onSelect(event) {
    this.selectedAnnouncement = true;
    this.announcementId = event.selected[0].id;
  }

  removeSelected() {
    this.selectedAnnouncement = false;
    this.announcementId = null;
    this.selected = [];
  }

  private getCurrentMonthAndYear() {
    return {month: this.selectForm.controls['month'].value, year: this.selectForm.controls['year'].value};
  }

}
