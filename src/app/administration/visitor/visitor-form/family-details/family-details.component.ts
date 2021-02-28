import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { VisitorFormService } from '../../visitor-form.service';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent implements OnInit {

  familyDetails: FormArray;
  formSubmitted: boolean;

  constructor(private formService: VisitorFormService) {
    this.familyDetails = this.formService.familyDetails;
    this.formSubmitted = this.formService.formSubmitted;
  }

  ngOnInit() {
  }

}
