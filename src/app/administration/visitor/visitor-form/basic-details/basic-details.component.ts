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

  constructor(private formService: VisitorFormService) {
    this.basicForm = this.formService.basicDetails;
    this.formSubmitted = this.formService.formSubmitted;
  }

  ngOnInit() {
  }

}
