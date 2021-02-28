import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HelperService } from '../../../core/services/helper.service';
import { VisitorModel } from './visitor.model';
import { NotificationService } from '../../../core/services/notification.service';
import { MDBModalRef, TabsetComponent } from 'ng-uikit-pro-standard';
import { AddVisitorService } from './add-visitor.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent implements OnInit {

  visitorGreeterUrl = '/visitor-greeter';
  formSubmitted = false;
  familyFormSubmitted = false;
  visitorModel: VisitorModel;
  methods: Array<any>;
  biblestudy: Array<any>;
  familyMembers: Array<any> = [];
  @ViewChild('frame') familyModal: MDBModalRef;
  @ViewChild('tabset') tabset: TabsetComponent;
  familyMemberForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    age: new FormControl(null)
  });
  visitorForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    methodOfContacts: new FormControl(null, [Validators.required]),
    bibleStudy: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    state: new FormControl(null),
    zip: new FormControl(null),
    greeter: new FormControl(null, [Validators.required]),
    notes: new FormControl(null)
  });

  constructor(private helperService: HelperService, private addVisitorService: AddVisitorService,
              private notificationService: NotificationService, private authorizationService: AuthorizationService,
              private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {



    this.methods = [
      { value: 'text', label: 'Text' },
      { value: 'call', label: 'Phone Call' },
      { value: 'email', label: 'Email' }
    ];
    this.biblestudy = [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' }
    ];
    this.authorizationService.checkForValidToken();
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.visitorForm.valid) {
      this.visitorModel = this.visitorForm.value;
      this.visitorModel.familyMembers = this.familyMembers;
      console.log(this.visitorModel);
      this.addVisitorService.addVisitor(this.visitorModel).subscribe(res => {
        this.notificationService.displaySuccess('Successfully submitted new visitor', 'Successful Request');
        this.formSubmitted = false;
        this.visitorForm.reset();
        this.tabset.setActiveTab(1);
        this.familyMembers = [];
        this.familyMemberForm.reset();
      }, error => {
        this.notificationService.displayError('Error has occurred', 'Form Error');
      })
      
    } else {
      this.notificationService.displayError('Please fill in the required items.', 'Form Error');
    }
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
    this.familyMembers.splice(this.familyMembers.findIndex(x => x === item));
  }

  nextTab() {
    this.tabset.setActiveTab(2);
  }

  previousTab() {
    this.tabset.setActiveTab(1);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
    this.notificationService.displayError('You are no longer logged in. Please login to continue.', 'Authentication');
  }
}
