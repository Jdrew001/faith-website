import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VisitorService } from './visitor.service';
import { VisitorTableModel } from './visitor-table.model';
import { VisitorDetailsService } from './visitor-details/VisitorDetailsService';
import { MdbBtnDirective } from 'ng-uikit-pro-standard';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ConfirmService } from 'src/app/shared/components/confirm/confirm.service';
import { VisitorFilterModel } from './visitorfilter.model';
import { VisitorConstant } from './visitor.constant';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { isNullOrUndefined } from 'util';
import { AdministrationService } from '../../administration.service';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  @ViewChild("editBtn") editBtn: ElementRef;
  @ViewChild("delBtn") delBtn: ElementRef;
  @ViewChild("addBtn") addBtn: ElementRef;
  @ViewChild('table') table: DatatableComponent;
  @ViewChild('confirm') confirm: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;
  isMobile = true;
  data: any[] = [];
  temp = [];
  filteredData = [];
  kpi: any = {
    visitorTotal: '',
    bibleStudyTotal: '',
    visitorsTaught: '',
    newVisitorsTotal: ''
  };
  visitor: VisitorTableModel;
  visitorId: any;
  showModel = false;
  showConfirm = false;
  selectedUser = false;
  visitorTotalFilter = false;
  biblestudyFilter = false;
  visitorsFilter = false;
  newVisitorsTotal = false;
  columns = [
    { id: 'Visitor Id' },
    { name: 'Name' },
    { contact: 'Contact Information' },
    { name: 'Greeter' },
    { name: 'Contact Methods' },
    { name: 'Date' },
    { name: '' }
  ];
  selected = [];

  constructor(private visitorService: VisitorService,
              private visitorDetailsService: VisitorDetailsService,
              private notificationService: NotificationService,
              private confirmService: ConfirmService,
              private store: Store,
              private administrationService: AdministrationService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.administrationService.validateSystemModule('Visitor', this.store.selectSnapshot(TokenState.systemModules));
    this.fetchVisitors();
    this.fetchKpiCount();
    this.tableRefreshSubscribe();
    this.handleButtonState(true);
    this.visitorTotalFilter = true;
    
    if (window.screen.width < 500) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    console.log(window.screen.width, this.isMobile);
  }

  fetchVisitors() {
    this.loaderService.toggleLoader(true);
    this.visitorService.fetchVisitors().subscribe(data => {
      this.data = data;
      this.temp = [...data];
      this.filteredData = [...data];
      this.loaderService.toggleLoader(false);
    });
  }

  fetchKpiCount() {
    this.visitorService.fetchVisitorKpi().subscribe(data => {
      this.kpi = data;
      console.log(this.kpi);
    });
  }

  onKpiFilter(type) {
    this.selected = [];
    switch (type) {
      case VisitorConstant.TOTAL_FILTER:
        this.totalVisitorsFilter();
      break;
      case VisitorConstant.BIBLESTUDY_FILTER:
        this.bibleStudyFilter();
      break;
      case VisitorConstant.VISITOR_TAUGHT_FILTER:
        this.visitorsTaughtFilter();
      break;
      case VisitorConstant.NEW_VISITORS_FILTER:
        this.newVisitorFilter();
      break;
    }
  }

  totalVisitorsFilter() {
    this.visitorTotalFilter = true;
    this.biblestudyFilter = false;
    this.visitorsFilter = false;
    this.newVisitorsTotal = false;
    this.loaderService.toggleLoader(true);
    this.visitorService.fetchFilteredVisitors('total-visitors').subscribe(data => {
      this.data = data;
      this.loaderService.toggleLoader(false);
    });
  }

  bibleStudyFilter() {
    this.visitorTotalFilter = false;
    this.biblestudyFilter = true;
    this.visitorsFilter = false;
    this.newVisitorsTotal = false;
    this.loaderService.toggleLoader(true);
    this.visitorService.fetchFilteredVisitors('biblestudy').subscribe(data => {
      this.data = data;
      this.loaderService.toggleLoader(false);
    });
  }

  visitorsTaughtFilter() {
    this.visitorTotalFilter = false;
    this.biblestudyFilter = false;
    this.visitorsFilter = true;
    this.newVisitorsTotal = false;
    this.loaderService.toggleLoader(true);
    this.visitorService.fetchFilteredVisitors('visitors-taught').subscribe(data => {
      this.data = data;
      this.loaderService.toggleLoader(false);
    });
  }

  newVisitorFilter() {
    this.visitorTotalFilter = false;
    this.biblestudyFilter = false;
    this.visitorsFilter = false;
    this.newVisitorsTotal = true;
    this.loaderService.toggleLoader(true);
    this.visitorService.fetchFilteredVisitors('new-visitors').subscribe(data => {
      this.data = data;
      this.loaderService.toggleLoader(false);
    });
  }

  onSelect(event) {
    this.visitorId = event.selected[0].visitorId;
    console.log(this.selected);
    this.selectedUser = true;
    this.handleButtonState(false);
  }

  openDetails() {
    this.loaderService.toggleLoader(true);
    this.visitorDetailsService.fetchVisitor(+this.visitorId).subscribe(data => {
      this.loaderService.toggleLoader(false);
      this.visitorDetailsService.visitorDetailsSubject.next(data);
      this.showModel = true;
    });
  }

  openDetailsAdd() {
    this.visitorDetailsService.visitorDetailsSubject.next(null);
  }

  deleteVisitor() {
    this.confirmService.confirmSubject.next(true);
  }

  removeSelected() {
    this.selected = [];
    this.selectedUser = false;
    this.handleButtonState(true);
  }

  tableRefreshSubscribe() {
    this.visitorService.tableRefresh$.subscribe(() => {
      this.visitorTotalFilter = true;
      this.biblestudyFilter = false;
      this.visitorsFilter = false;
      this.newVisitorsTotal = false;
      this.fetchKpiCount();
      this.fetchVisitors();
    });
  }

  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    let val = event.target.value.toLowerCase();

    if (val === '') {
      this.data = this.temp;
    }

    // get the amount of columns in the table
    let colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    if (!isNullOrUndefined(this.data[0])) {
      let keys = Object.keys(this.data[0]);

      // assign filtered matches to the active datatable
      this.data = this.filteredData.filter(function(item){
        // iterate through each row's column data
        for (let i=0; i<colsAmt; i++){
          // check for a match
          if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
            // found match, return true to add to result set
            return true;
          }
        }
      });
    }
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
    console.log(event);
  }

  onConfirm(event) {
    this.loaderService.toggleLoader(true);
    this.visitorDetailsService.deleteVisitor(this.visitorId).subscribe(() => {
      this.loaderService.toggleLoader(false);
      this.notificationService.displaySuccess('Successfully deleted visitor', '');
      this.visitorService.tableRefreshSubject.next();
      this.removeSelected();
      this.searchInput.nativeElement.value = '';
    });
  }

  handleButtonState(enabled) {
    if (!enabled) {
      this.editBtn.nativeElement.disabled = false;
      this.delBtn.nativeElement.disabled = false;
    } else {
      this.editBtn.nativeElement.disabled = true;
      this.delBtn.nativeElement.disabled = true;
    }
  }

}
