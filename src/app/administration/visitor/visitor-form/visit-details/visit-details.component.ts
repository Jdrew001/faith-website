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

  get firstTimeVisitor() { return this.visitForm.controls['firstTimeVisitor'].value; }
  get returningVisitor() { return this.visitForm.controls['returningVisitor'].value; }
  get newResident() { return this.visitForm.controls['newResident'].value; }
  get wouldLikeVisit() { return this.visitForm.controls['wouldLikeVisit'].value }
  get wouldLikeKnowChurch() { return this.visitForm.controls['wouldLikeKnowChurch'].value }
  get wouldLikeKnowChristian() { return this.visitForm.controls['wouldLikeKnowChristian'].value }


  constructor(private formService: VisitorFormService) {
    this.visitForm = this.formService.visitDetails;
    this.formSubmitted = this.formService.formSubmitted;
  }

  ngOnInit() {
  }

}
