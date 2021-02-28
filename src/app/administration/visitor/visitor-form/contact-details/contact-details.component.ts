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

  constructor(private formService: VisitorFormService) {
    this.contactForm = this.formService.contactDetails;
    this.formSubmitted = this.formService.formSubmitted;
  }

  ngOnInit() {
  }

}
