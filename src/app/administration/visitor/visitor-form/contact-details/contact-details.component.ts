import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VisitorFormService } from '../../visitor-form.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contactForm: FormGroup;
  formSubmitted: boolean;

  get phoneField() { return this.contactForm.controls['phone'].value };
  get emailField() { return this.contactForm.controls['email'].value };

  constructor(private formService: VisitorFormService) {
    this.contactForm = this.formService.contactDetails;
    this.formSubmitted = this.formService.formSubmitted;
  }

  clearField(field) {
    this.contactForm.controls[field].setValue('');
  }

  ngOnInit() {
  }

}
