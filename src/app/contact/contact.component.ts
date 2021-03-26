import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { ContactConstant } from './contact.constant';
import { SubscribeService } from '../core/services/subscribe.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactModel } from './contact.model';
import { SubmitContact } from '../shared/actions/contact/SubmitContact';
import { Store } from '@ngxs/store';
import { ContactService } from './service/contact.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../core/services/notification.service';
import { LoaderService } from '../core/loader/loader.service';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  } 

  headingImgUrl = "";
  site_key = environment.SITE_KEY;
  optionsSelect: any[];
  formSubmitted = false;
  contactModel: ContactModel;
  contactForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    captcha: new FormControl('')
  });

  constructor(
      private helperService: HelperService,
      private contactService: ContactService,
      private subscribeService: SubscribeService,
      private notificationService: NotificationService,
      private loaderService: LoaderService,
      private scrollService: ScrollService
    ) { }

  ngOnInit() {
    this.headingImgUrl = this.helperService.getResourceUrl(ContactConstant.HEADING_IMAGE, true);
    this.subscribeService.urlChanged('contact');
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      this.loaderService.toggleLoader(true);
      this.contactService.uploadContact(this.contactForm.getRawValue()).subscribe(res => {
        this.loaderService.toggleLoader(false);
        this.notificationService.displaySuccess('Successfully sent message', 'SUCCESS');
        this.contactForm.reset();
      }, err => {
        this.loaderService.toggleLoader(false);
        this.notificationService.displayError('Error sending message', 'ERROR');
      })
      // this.contactService.sendContact(this.contactForm.getRawValue()).then(res => {
      //   // successfully sent email
      //   this.loaderService.toggleLoader(false);
      //   this.notificationService.displaySuccess('Successfully sent message', 'SUCCESS');
      //   this.contactForm.reset();
      // }).catch(err => {
      //   this.notificationService.displayError('Error sending message', 'ERROR');
      // });
    }
  }

  clearForm() {
    this.formSubmitted = false;
    this.contactForm.reset();
  }

  handleSuccess(e) {
    console.log(e);
  }

  handleLoad() {

  }

  handleExpire() {

  }

  handleReset() {

  }

}
