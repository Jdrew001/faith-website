import { Component, OnInit, DoCheck, AfterViewInit, HostListener, ViewChild } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { GiveConstants } from './give.constant';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { GiveFormValidator } from './utls/GiveValidator';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { GiveService } from './give.service';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '../shared/scroll.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-give',
  templateUrl: './give.component.html',
  styleUrls: ['./give.component.css']
})
export class GiveComponent implements OnInit, DoCheck {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  } 

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  giveValidator = new GiveFormValidator();
  activeFormIndex = 0;
  offeringCategories = [];
  imageUrl = '';
  formSubmitted = false;
  giveTotal: number = 0;
  giveForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    tithe: new FormControl(0),
    offeringArray: new FormArray([]),
    feeCover: new FormControl(true)
  }, [this.giveValidator.oneRequired]);

  cardOpts: StripeCardElementOptions = {
    hidePostalCode: true,
    iconStyle: 'solid',
    style: {
      base: {
        backgroundColor: '#f7f7f7',
        iconColor: '#E02E2E',
        color: '#31325F',
        lineHeight: '50px',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '14px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    }
  }
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  constructor(
    private helperService: HelperService,
    private giveService: GiveService,
    private activeRoute: ActivatedRoute,
    private scrollService: ScrollService,
    private stripeService: StripeService,
    private notificationService: NotificationService) { }

  get giveControls() {
    return {
      email: this.giveForm.get('email'),
      firstName: this.giveForm.get('firstName'),
      lastName: this.giveForm.get('lastName'),
      phone: this.giveForm.get('phone'),
      tithe: this.giveForm.get('tithe'),
      offeringArray: this.giveForm.get('offeringArray'),
      feeCover: this.giveForm.get('feeCover')
    }
  }

  get offeringArray() {
    return this.giveForm.get('offeringArray') as FormArray;
  }

  get lastOfferingControls() {
    return this.offeringArray.controls[this.offeringArray.length - 1];
  }

  ngOnInit() {
    this.imageUrl = this.helperService.getResourceUrl(GiveConstants.GIVE_BG_URL, true);
    this.showOrderResult(this.activeRoute.snapshot.queryParams);
  }

  ngDoCheck() {
    const titheAmount = this.giveControls.tithe;
    if (!titheAmount.value) { titheAmount.setValue(0) }
    this.offeringArray.controls.forEach((val: FormGroup)=> {
      let offering = val.get('offering');
      if (!offering.value) { offering.setValue(0) };
    })
    
    this.giveTotal = this.calculateTotal(titheAmount, this.offeringArray);
  }

  submitWithPaypal() {
    this.formSubmitted = true;
    this.giveForm.updateValueAndValidity({onlySelf:true, emitEvent: false});
    if (this.giveForm.valid) {
      this.formSubmitted = false;
      const formVal = this.giveForm.value;
      formVal.phone = formVal.phone.replace(/\D/g,"");
      this.giveService.initiateGivingRequest(formVal, this.giveTotal.toString());
    }
  }
  
  submitWithStripe() {
    
    this.formSubmitted = true;
    this.giveForm.updateValueAndValidity({onlySelf:true, emitEvent: false});
    if (this.giveForm.valid) {
      this.formSubmitted = false;
      const formVal = this.giveForm.value;
      formVal.phone = formVal.phone.replace(/\D/g,"");
      this.activeFormIndex = 1;
    }
  }

  paymentWithStripe() {
    this.stripeService
      .createToken(this.card.element)
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          this.notificationService.displayError('Error', result.error.message);
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  clearForm() {
    this.formSubmitted = false;
    this.giveForm.reset();
    this.giveControls.tithe.setValue(0);
    while (this.offeringArray.length !== 0) {
      this.offeringArray.removeAt(0);
    }
    this.giveControls.feeCover.setValue(true);
    this.giveForm.updateValueAndValidity({onlySelf:true, emitEvent: false});
  }

  addOffering() {
    const formArr = this.giveControls.offeringArray as FormArray;
    formArr.push(new FormGroup({
      offering: new FormControl(0),
      offeringCategory: new FormControl(null),
      otherOffering: new FormControl(null)
    }, [this.giveValidator.offeringRequired, this.giveValidator.validateOffering, this.giveValidator.validateOfferingOther]));
  }

  popOffering() {
    const formArr = this.giveControls.offeringArray as FormArray;
    formArr.removeAt(formArr.length - 1);
    if (formArr.length === 0) {
      GiveConstants.OFFERING_CATEGORIES.forEach(val => val.disabled = false);
    } else {
      GiveConstants.OFFERING_CATEGORIES.forEach(val => val.disabled = false);
      formArr.value.forEach(element => {
        let item = GiveConstants.OFFERING_CATEGORIES.find(x => x.value === element['offeringCategory']);
        if (item) {
          item.disabled = true;
        }
      });
    }
  }

  categories(formArr: FormArray) {
    var newItems = GiveConstants.OFFERING_CATEGORIES;
    formArr.controls.forEach((val: FormGroup, i) => {
      let cat = val.controls['offeringCategory'].value;
      newItems.forEach(item => {
        if (cat === item.value) {
          if (cat !== 'Other') {
            item.disabled = true;
          }
        }
      })
    });

    return newItems;
  }

  validateOther(control) {
    let res = false;
    if (control.value && control.value.offeringCategory === 'Other') {
      res = true;
    }

    return res;
  }

  private showOrderResult(params) {
    if (params && params.token) {
      this.giveService.captureOrder();
    }
  }

  private calculateTotal(tithe, offering: FormArray) : number {
    let offeringTotal = 0;
    offering.controls.forEach(val => {
      offeringTotal += val.get('offering').value;
    });

    if (this.giveControls.feeCover.value && (tithe.value + offeringTotal) !== 0) {
      return +(tithe.value + offeringTotal + (((tithe.value + offeringTotal) * GiveConstants.RATE_FEE.rate) + 0.30)).toFixed(2);
    }

    return tithe.value + offeringTotal;
  }
}
