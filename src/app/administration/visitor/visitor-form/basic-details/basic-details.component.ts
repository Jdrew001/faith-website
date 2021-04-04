import { Component, OnInit } from '@angular/core';
import { VisitorFormService } from '../../visitor-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {

  basicForm: FormGroup;
  formSubmitted: boolean;

  get fullNameField() { return this.basicForm.controls['fullName'].value; }
  get addressField() { return this.basicForm.controls['address'].value; }
  get cityField() { return this.basicForm.controls['city'].value };
  get stateField() { return this.basicForm.controls['state'].value };

  constructor(private formService: VisitorFormService) {
    this.basicForm = this.formService.basicDetails;
    this.formSubmitted = this.formService.formSubmitted;

    console.log(this.fullNameField);
  }

  ngOnInit() {
  }

  clearField(field) {
    this.basicForm.controls[field].setValue('');
  }

}
