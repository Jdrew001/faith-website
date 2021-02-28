import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { UserTableModel } from '../user-table.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Store } from '@ngxs/store';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable/release/utils';
import { ConfirmService } from 'src/app/shared/components/confirm/confirm.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  email: any;
  data: any[] = [];
  temp: any[] = [];
  filteredData = [];
  selectedUser = false;
  user: UserTableModel;
  loggedInUser: string;
  userRole: string;
  @ViewChild("editBtn") editBtn: ElementRef;
  @ViewChild("addBtn") addBtn: ElementRef;
  @ViewChild("delBtn") delBtn: ElementRef;
  @ViewChild('table') table: DatatableComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  columns = [
    { firstname: 'First Name' },
    { lastname: 'Last Name' },
    { email: 'Email' },
    { username: 'Username' },
    { globalRoleName: 'Global Role' },
    { systemModules: 'System Modules' }
  ];
  selected = [];

  constructor(private userService: UserService, private notificationService: NotificationService, private store: Store,
              private authorizationService: AuthorizationService, private confirmService: ConfirmService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.userRole = this.authorizationService.getUserRole();
    this.fetchUser();
    this.tableRefreshSubscribe();
  }

  fetchUser() {
    this.loaderService.toggleLoader(true);
    this.userService.fetchUsers().subscribe(data => {
      this.loaderService.toggleLoader(false);
      this.data = data;
      this.filteredData = [...data];
      this.temp = data;
    });
  }

  deleteUser() {
    this.confirmService.confirmSubject.next(true);
  }

  onConfirm(event) {
    this.loaderService.toggleLoader(true);
    this.userService.deleteUser(this.selected[0].email).subscribe(data => {
      this.loaderService.toggleLoader(false);
      this.notificationService.displaySuccess('Successfully removed user', '');
      this.userService.tableRefreshSubject.next();
      this.searchInput.nativeElement.value = '';
    }, error => {
      this.notificationService.displayError('An error occured. Please contact system support', '');
    });
  }

  onSelect(event) {
    this.selectedUser = false;
    if (this.loggedInUser === event.selected[0].email) {
      this.notificationService.displayInfo('Unable to edit the logged in user', '');
    } else {
      this.email = event.selected[0].email;
      this.selectedUser = true;
    }
  }

  removeSelected() {
    this.selected = [];
    this.selectedUser = false;
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

  openDetails() {
    this.loaderService.toggleLoader(true);
    this.userService.fetchUser(this.email).subscribe(data => {
      this.loaderService.toggleLoader(false);
      this.userService.userDetailsSubject.next(data);
    });
  }

  openDetailsAdd() {
    this.userService.userDetailsSubject.next(null);
  }

  tableRefreshSubscribe() {
    this.userService.tableRefresh$.subscribe(() => {
      this.fetchUser();
      this.removeSelected();
      this.searchInput.nativeElement.value = '';
    });
  }

}
