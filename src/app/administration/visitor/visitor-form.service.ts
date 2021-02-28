import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Injectable()
export class VisitorFormService {

  private _visitorForm: FormGroup;
  private _basicDetails: FormGroup;
  private _contactDetails: FormGroup;
  private _familyDetails: FormArray;
  private _visitDetails: FormGroup;
  private _greeterDetails: FormGroup;
  private _formSubmitted: boolean;

  get visitorForm() { return this._visitorForm; }
  get basicDetails() { return this._basicDetails; }
  get contactDetails() { return this._contactDetails; }
  get familyDetails() { return this._familyDetails; }
  get visitDetails() { return this._visitDetails; }
  get greeterDetails() { return this._greeterDetails; }
  get formSubmitted() { return this._formSubmitted; }
  set formSubmitted(val: boolean) { this._formSubmitted = val; }

  constructor() { }

  createVisitorForm(): FormGroup {
    return this._visitorForm = new FormGroup({
      basicDetails: this.createBasicDetails(),
      contactDetails: this.createContactDetails(),
      familyDetails: this.createFamilyDetails(),
      visitDetails: this.createVisitDetails(),
      greeterDetails: this.createGreeterDetails()
    });
  }

  createBasicDetails(): FormGroup {
    return this._basicDetails = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required)
    });
  }

  createContactDetails(): FormGroup {
    return this._contactDetails = new FormGroup({
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required)
    });
  }

  createFamilyDetails(): FormArray {
    return this._familyDetails = new FormArray([]);
  }

  addFamilyMember(name, age, relationship): FormArray {
    const member = new FormGroup({
      name: new FormControl(name),
      age: new FormControl(age),
      relationship: new FormControl(relationship)
    });
    this._familyDetails.push(member);
    return this._familyDetails;
  }

  createVisitDetails(): FormGroup {
    return this._visitDetails = new FormGroup({
      firstTimeVisitor: new FormControl(null),
      returningVisitor: new FormControl(null),
      newResident: new FormControl(null),
      wouldLikeVisit: new FormControl(null),
      wouldLikeKnowChurch: new FormControl(null),
      wouldLikeKnowChristian: new FormControl(null)
    });
  }

  createGreeterDetails(): FormGroup {
    return this._greeterDetails = new FormGroup({
      greeter: new FormControl(null, Validators.required),
      greeterNotes: new FormControl(null)
    });
  }

  getInvalidFormControl() {
    
  }
}
