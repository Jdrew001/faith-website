import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VisitorFormService } from '../../visitor-form.service';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})
export class VisitDetailsComponent implements OnInit {

  visitForm: FormGroup;
  formSubmitted: boolean;

  constructor(private formService: VisitorFormService) {
    this.visitForm = this.formService.visitDetails;
    this.formSubmitted = this.formService.formSubmitted;
  }

  ngOnInit() {
  }

}
