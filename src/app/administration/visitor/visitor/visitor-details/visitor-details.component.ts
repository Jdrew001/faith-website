import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MDBModalRef, MDBModalService, TabsetComponent } from 'ng-uikit-pro-standard';
import { VisitorDetailsService } from './VisitorDetailsService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { VisitorModel } from '../../add-visitor/visitor.model';
import { VisitorService } from '../visitor.service';
import { Subscriber } from 'rxjs';
import { isNullOrUndefined } from '@swimlane/ngx-datatable/release/utils';
import { AddVisitorService } from '../../add-visitor/add-visitor.service';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.component.html',
  styleUrls: ['./visitor-details.component.css']
})
export class VisitorDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('modal') mdbModal: any;
  @ViewChild('frame') familyModal: MDBModalRef;
  @ViewChild('tabset') tabset: TabsetComponent;
  dialogSubscriber: any;
  visitorId: number;
  isEdit = false;
  biblestudy: Array<any>;
  methods: Array<any>;
  taught: Array<any>;
  visitorModel: VisitorModel;
  familyMembers: Array<any> = [];
  formSubmitted = false;
  familyFormSubmitted = false;
  visitorAdd = false;
  familyMemberForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required])
  });
  visitorForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    methodOfContacts: new FormControl(null),
    bibleStudy: new FormControl(null, [Validators.required]),
    taught: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    zip: new FormControl(null),
    greeter: new FormControl(null, [Validators.required]),
    notes: new FormControl(null)
  });

  constructor(private visitorDetailsService: VisitorDetailsService,
              private notificationService: NotificationService, private visitorService: VisitorService,
              private addVisitorService: AddVisitorService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.initialize();
    this.subscribeData();
  }

  updateVisitor() {
    this.formSubmitted = true;
    if (this.visitorForm.valid) {
      this.visitorModel = this.visitorForm.value;
      this.visitorModel.visitorId = this.visitorId;
      this.visitorModel.familyMembers = this.familyMembers;
      this.checkInputs();
      this.loaderService.toggleLoader(true);
      this.visitorDetailsService.updateVisitor(this.visitorModel).subscribe(data => {
        this.loaderService.toggleLoader(false);
        this.isEdit = false;
        this.visitorForm.disable();
        this.notificationService.displaySuccess('Successfully updated the information', '');
        this.visitorService.tableRefreshSubject.next();
        this.tabset.setActiveTab(1);
      });
    } else {
      console.log("ERRPR");
      this.loaderService.toggleLoader(false);
    }
  }

  addVisitor() {
    this.formSubmitted = true;
    if (this.visitorForm.valid) {
      this.visitorModel = this.visitorForm.value;
      console.log(this.visitorModel);
      this.visitorModel.familyMembers = this.familyMembers;
      this.checkInputs();
      this.loaderService.toggleLoader(true);
      this.addVisitorService.addVisitor(this.visitorModel).subscribe(data => {
        this.loaderService.toggleLoader(false);
        this.isEdit = false;
        this.visitorForm.disable();
        this.notificationService.displaySuccess('Successfully added new visitor', '');
        this.visitorService.tableRefreshSubject.next();
        this.visitorAdd = false;
        this.tabset.setActiveTab(1);
        this.mdbModal.hide();
      }, error => {
        this.notificationService.displayError('An error has occurred adding new visitor', '');
        this.loaderService.toggleLoader(false);
      });
    }
  }

  subscribeData() {
    this.dialogSubscriber = this.visitorDetailsService.visitorDetails$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        this.visitorForm.patchValue(data);
        this.visitorId = data.id;
        this.familyMembers = data.familyMembers;
        const contacts = [];
        data.methodOfContacts.forEach(method => {
          contacts.push(method.methodType);
        });
        this.visitorForm.controls['methodOfContacts'].setValue(contacts);
      } else {
        this.visitorForm.reset();
        this.visitorAdd = true;
        this.isEdit = true;
        this.visitorForm.enable();
      }
      this.mdbModal.show();
    });
  }

  fetchData() {
    this.loaderService.toggleLoader(true);
    this.visitorDetailsService.fetchVisitor(this.visitorId).subscribe(data => {
      this.loaderService.toggleLoader(false);
      this.visitorForm.patchValue(data);
      this.familyMembers = data.familyMembers;
      const contacts = [];
      data.methodOfContacts.forEach(method => {
        contacts.push(method.methodType);
      });
      this.visitorForm.controls['methodOfContacts'].setValue(contacts);
    });
  }

  addFamilyMember() {
    this.familyFormSubmitted = true;
    if (this.familyMemberForm.valid) {
      this.familyMembers.push(this.familyMemberForm.value);
      this.familyModal.hide();
      this.familyMemberForm.reset();
      this.familyFormSubmitted = false;
    } else {
      this.notificationService.displayError('Please fill in the required items.', 'Form Error');
    }
  }

  removeFamilyMember(item) {
    if (this.isEdit) {
      this.familyMembers.splice(this.familyMembers.findIndex(x => x === item));
    }
  }

  editMode() {
    if (this.isEdit) {
      this.isEdit = false;
      this.visitorForm.disable();
      this.fetchData();
    } else {
      this.isEdit = true;
      this.visitorForm.enable();
    }
  }

  onClose(event) {
    console.log('testing');
    this.isEdit = false;
    this.visitorForm.reset();
    this.visitorForm.disable();
  }

  initialize() {
    this.visitorForm.disable();
    this.methods = [
      { value: 'text', label: 'Text' },
      { value: 'call', label: 'Phone Call' },
      { value: 'email', label: 'Email' }
    ];
    this.biblestudy = [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ];
    this.taught = [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ];
  }

  checkInputs() {
    if (isNullOrUndefined(this.visitorModel.email)) {
      this.visitorModel.email = '';
    }
    if (isNullOrUndefined(this.visitorModel.phoneNumber)) {
      this.visitorModel.phoneNumber = '';
    }
    if (isNullOrUndefined(this.visitorModel.methodOfContacts)) {
      this.visitorModel.methodOfContacts = [];
      this.visitorModel.methodOfContacts.push('n/a');
    }
    if (!isNullOrUndefined(this.visitorModel.methodOfContacts)) {
      if (this.visitorModel.methodOfContacts.length === 0) {
        this.visitorModel.methodOfContacts.push('n/a');
      }
    }
  }

  resetFormValues() {
    this.visitorForm.controls['firstname'].setValue(null);
    this.visitorForm.controls['lastname'].setValue(null);
    this.visitorForm.controls['phoneNumber'].setValue(null);
    this.visitorForm.controls['email'].setValue(null);
    this.visitorForm.controls['methodOfContacts'].setValue(null);
    this.visitorForm.controls['bibleStudy'].setValue(null);
    this.visitorForm.controls['taught'].setValue(null);
    this.visitorForm.controls['address'].setValue(null);
    this.visitorForm.controls['zip'].setValue(null);
    this.visitorForm.controls['greeter'].setValue(null);
    this.visitorForm.controls['notes'].setValue(null);
  }
  
  ngOnDestroy() {
    if (this.dialogSubscriber) {
      this.dialogSubscriber.unsubscribe();
    }
  }

}
