import { Component, OnInit } from '@angular/core';
import { VisitorFormService } from '../visitor-form.service';
import { FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VisitorResourceService } from './visitor-resource.service';
import { VisitorModel } from './models/Visitor.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HelperService } from 'src/app/core/services/helper.service';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-visitor-form',
  templateUrl: './visitor-form.component.html',
  styleUrls: ['./visitor-form.component.css'],
  animations: [
    trigger('enterTrigger', [
    state('fadeIn', style({
        opacity: '1'
    })),
    transition('void => *', [style({opacity: '0'}), animate('500ms')])
    ])
  ]
})
export class VisitorFormComponent implements OnInit {

  activeFormIndex = 0;
  minBounds = 0;
  maxBounds = 2;
  visitorForm: FormGroup;
  backgroundImg

  constructor(
    private visitorFormService: VisitorFormService,
    private visitorResService: VisitorResourceService,
    private notificationService: NotificationService,
    private helperService: HelperService,
    private loaderService: LoaderService
    ) { }

  ngOnInit() {
    this.visitorForm = this.visitorFormService.createVisitorForm();
    this.backgroundImg = this.helperService.getResourceUrl('images/worship.jpg', true);
  }

  submitForm() {
    this.visitorFormService.formSubmitted = true;
    if (this.visitorForm.valid) {
      this.loaderService.toggleLoader(true);
      this.visitorResService.save(this.visitorForm.value as VisitorModel).subscribe(res => {
        this.handleSuccess(res);
      }, err => {
        this.handleError(err);
      });
    } else {
      console.log('error', this.visitorForm.value);
      this.notificationService.displayError('Please ensure all required fields are provided', 'Invalid Form');
    }
  }

  nextForm() {
    this.activeFormIndex !== this.maxBounds ? this.activeFormIndex++ : null;
  }

  previousForm() {
    this.activeFormIndex !== this.minBounds ? this.activeFormIndex-- : null;
  }

  private handleSuccess(res) {
    this.loaderService.toggleLoader(false);
    this.activeFormIndex = 0;
    this.notificationService.displaySuccess('Success!', 'Successfully Submitted');
    this.visitorForm.reset();
    this.visitorFormService.formSubmitted = false;
  }

  private handleError(err) {
    this.loaderService.toggleLoader(false);
    this.notificationService.displayError('Error','An error as occurred');
  }
}
