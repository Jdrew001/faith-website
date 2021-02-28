import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserTableModel, NameModel } from '../user-table.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { isNullOrUndefined } from '@swimlane/ngx-datatable/release/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserManagementService } from '../user-management.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('modal') mdbModal: any;
  userForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    globalRoleName: new FormControl(null, [Validators.required]),
    systemModules: new FormControl(null, [Validators.required])
  });
  dialogSubscriber: any;
  isEdit = false;
  email: any;
  userFormSubmitted = false;
  userModel: UserTableModel;
  systemModel: NameModel[] = [];
  globalRoleName = [];
  systemModule = [];
  isCreate: Observable<boolean>;
  userRole = '';
  

  constructor(private userService: UserService, private notificationService: NotificationService,
              private userManagementService: UserManagementService, private authorizationService: AuthorizationService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.userRole = this.authorizationService.getUserRole();
    this.initializeData();
    this.userForm.disable();
    this.subscribeData();
    this.isCreate = this.userManagementService.isCreate$;
  }

  subscribeData() {
    this.dialogSubscriber = this.userService.userDetails$.subscribe(data => {
      console.log(data);
      if (!isNullOrUndefined(data)) {
        this.userForm.patchValue(data);
        this.email = data.email;
        const mods = [];
        data.systemModules.forEach(val => {
          mods.push(val.name);
        });
        this.userForm.controls['systemModules'].setValue(mods);
        this.userManagementService.isCreate$.next(false);
      } else {
        this.userForm.enable();
        this.userManagementService.isCreate$.next(true);
      }
      this.mdbModal.show();
    });
  }

  fetchUser() {
    this.userService.fetchUser(this.email).subscribe(data => {
      this.userForm.patchValue(data);
      const mods = [];
      data.systemModules.forEach(val => {
        mods.push(val.name);
      });
      this.userForm.controls['systemModules'].setValue(mods);
      this.email = data.email;
    });
  }

  updateUser() {
    this.userFormSubmitted = true;
    if (this.userForm.valid) {
      this.systemModel = [];
      this.userModel = this.userForm.value;
      this.userForm.value.systemModules.forEach(data => {
        var nameData = {
          name : data
        };
        this.systemModel.push(nameData);
      });
      this.userModel.systemModules = this.systemModel;
      this.loaderService.toggleLoader(true);
      this.userService.updateUser(this.userModel, this.email).subscribe(data => {
        this.loaderService.toggleLoader(false);
        this.isEdit = false;
        this.userForm.disable();
        this.notificationService.displaySuccess('Successfully updated the user information', '');
        this.userService.tableRefreshSubject.next();
        this.userForm.reset();
        this.userFormSubmitted = false;
        this.mdbModal.hide();
      });
    }
  }

  createUser() {
    this.systemModel = [];
    this.userFormSubmitted = true;
    if (this.userForm.valid) {
      this.userModel = this.userForm.value;
      this.userForm.value.systemModules.forEach(data => {
        var nameData = {
          name : data
        };
        this.systemModel.push(nameData);
      });
      this.userModel.systemModules = this.systemModel;
      this.loaderService.toggleLoader(true);
      this.userService.addNewUser(this.userModel).subscribe(data => {
        this.loaderService.toggleLoader(false);
        this.notificationService.displaySuccess('Successfully added a new user', '');
        this.userService.tableRefreshSubject.next();
        this.userForm.reset();
        this.userFormSubmitted = false;
        this.mdbModal.hide();
      }, error => {

      });
    }
  }

  editMode() {
    if (this.isEdit) {
      this.isEdit = false;
      this.userForm.disable();
      this.fetchUser();
    } else {
      this.isEdit = true;
      this.userForm.enable();
    }
  }

  onClose(event) {
    this.isEdit = false;
    this.userForm.disable();
    this.userForm.reset();
  }

  initializeData() {
    this.globalRoleName = [
      { value: 'Admin', label: 'Admin' },
      { value: 'Viewer', label: 'Viewer' }
    ];
    this.systemModule = [
      { value: 'Announcement', label: 'Announcement' },
      { value: 'Alerts', label: 'Alerts' },
      { value: 'Contact', label: 'Contact'},
      { value: 'Visitor', label: 'Visitor' },
      { value: 'User_Management', label: 'User Management' }
    ]
  }

  ngOnDestroy() {
    if (this.dialogSubscriber) {
      this.dialogSubscriber.unsubscribe();
    }
  }

}
